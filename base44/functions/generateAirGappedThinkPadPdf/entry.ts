import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { createPdfGuide, fetchImageAsDataUrl } from '../../shared/pdfGuide.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const imgUrl = await fetchImageAsDataUrl('https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/60845842c_IMG_9992.jpeg', 'jpeg');

    const { doc, heading, subheading, para, bullet, numberedBullet, addPageNumbers } = createPdfGuide({
      title: 'The Air-Gapped ThinkPad',
      subtitle: 'A Step-by-Step Guide to Building an Offline Bitcoin Signer',
      imageUrl: imgUrl,
      imageFormat: 'JPEG',
      imageSize: 64,
      imageGap: 24,
      titleGap: 8,
    });

    // --- CONTENT ---

    heading('Introduction: Why an Air-Gapped ThinkPad?');

    para('An air-gapped machine is a computer that has never connected — and can never connect — to any network. By repurposing an older Lenovo ThinkPad into a dedicated, permanently offline Bitcoin signer, you get a fully open-source hardware wallet you control end-to-end: no vendor lock-in, no wireless attack surface, and nothing to trust but your own setup. ThinkPads are ideal for this because they are cheap on the second-hand market, well-documented, easy to open, and have service manuals that show exactly where the wireless cards live.');

    para('This guide walks you through physically removing the wireless hardware, locking down the BIOS, installing a minimal Linux distribution or Tails, running Sparrow or Electrum entirely offline, and signing transactions over an air gap using QR codes or a microSD card. The same machine can serve as one key in a multisig setup.');

    heading('What You Will Need');

    bullet('An older ThinkPad (e.g. T420, T430, T440, X220, X230) — any model with a removable bottom panel and accessible Wi-Fi card.');
    bullet('A small Phillips screwdriver set and a plastic spudger for prying connectors.');
    bullet('Two USB sticks (8 GB or larger) for the installer and for Tails.');
    bullet('The Tails ISO (tails.net) and/or a minimal Debian ISO (debian.org).');
    bullet('A second, internet-connected computer for downloading software and broadcasting signed transactions.');
    bullet('Sparrow Wallet (sparrowwallet.com) or Electrum (electrum.org) — download the installers and verify their signatures on your online machine first.');
    bullet('Optional: a USB webcam or smartphone for QR-code scanning, and a microSD card if your ThinkPad has a reader.');

    heading('Step 1 — Physically Remove the Wi-Fi & Bluetooth Cards');

    para('Software switches can be re-enabled, forgotten, or bypassed. Physically removing the wireless cards is the only way to guarantee the laptop can never reach a network. This is the single most important step in the whole guide.');

    numberedBullet(1, 'Shut the laptop down completely and unplug the power adapter. If your model has an external, removable battery, take it out.');
    numberedBullet(2, 'Ground yourself to avoid static discharge, then unscrew the screws on the bottom panel and carefully lift off the cover. Keep screws organized — they can differ in length.');
    numberedBullet(3, 'Locate the Wi-Fi card — a small, half-size M.2 or Mini PCIe board, usually near a corner, with two or three thin coaxial cables (black, grey, white) snapped onto its connectors.');
    numberedBullet(4, 'Note which antenna cable goes to which terminal (main/aux), then gently pop them off. Unscrew the single retaining screw, then slide the card out of its slot.');
    numberedBullet(5, 'If your model has a separate Bluetooth or WWAN (cellular) card, remove it the same way. Some ThinkPads combine Bluetooth onto the Wi-Fi card; others place it under the palm rest — remove it if present.');
    numberedBullet(6, 'For models with the wireless cards under the keyboard or palm rest, follow the Hardware Maintenance Manual for your exact model (search "ThinkPad T430 HMM") to disassemble safely.');
    numberedBullet(7, 'Reassemble the laptop and boot it up. Open the BIOS and confirm no wireless devices are detected — the network boot and wireless options should be gone or show as disabled.');

    para('Tip: If you ever want belt-and-suspenders security, you can also desolder or clip the antenna leads inside the chassis so that even reinstalling a card later gives it no antennas to radiate with.');

    heading('Step 2 — Lock Down the BIOS');

    para('Enter the BIOS (press F1 or Enter at the Lenovo splash screen) and harden the boot environment:');

    bullet('Set a supervisor (power-on) password so no one can change BIOS settings without it.');
    bullet('Disable Wi-Fi, Bluetooth, WWAN, and any "Wireless LAN" radio options — they should already be absent after Step 1, but disable any leftover entries.');
    bullet('Set the boot order to USB first, then the internal drive. Disable "Network Boot" / PXE entirely.');
    bullet('Disable the webcam, microphone, and fingerprint reader if you will not use them.');
    bullet('If available, enable Secure Boot only if you trust the keys — for a fully open-source setup you may leave it off, but understand the trade-off.');

    heading('Step 3 — Choose Your Operating System');

    subheading('Tails (Recommended for Most)');
    para('Tails is a portable, amnesic operating system that runs entirely from a USB stick and leaves no trace on the computer. Every time you boot it, it starts clean; when you shut down, nothing is saved unless you explicitly configure encrypted persistent storage. This is the simplest way to guarantee the signing environment is fresh and malware-free each session.');

    subheading('Debian (Minimal, Persistent)');
    para('A minimal Debian install gives you a stable, persistent environment you fully control. It is more work to harden, but lets you keep Sparrow/Electrum installed and configured between sessions. Use this if you want a permanent, repeatable signer rather than an amnesic one. Whichever you choose, never connect the machine to the internet after installation — transfer files in via USB or microSD only.');

    heading('Step 4 — Install Tails (Amnesic, USB-Based)');

    numberedBullet(1, 'On your online computer, download the Tails image and its signature from tails.net, and verify the image with GnuPG against the official signing key.');
    numberedBullet(2, 'Flash the image to a USB stick using a tool like balenaEtcher or Rufus (dd mode).');
    numberedBullet(3, 'Boot the offline ThinkPad from the USB stick (press F12 at startup for the boot menu).');
    numberedBullet(4, 'Once Tails is running, you can optionally set up encrypted Persistent Storage for your wallet file and Sparrow configuration — but never enable network connections even though Tails forces all traffic through Tor.');
    numberedBullet(5, 'Because the ThinkPad has no wireless hardware, Tails will simply report no network — exactly what you want.');

    heading('Step 5 — Install Debian (Minimal, Persistent)');

    numberedBullet(1, 'On your online computer, download the Debian netinst ISO and verify its signature. Also download the Sparrow or Electrum .deb/AppImage and its PGP signature for offline transfer.');
    numberedBullet(2, 'Flash the Debian ISO to a USB stick and boot the ThinkPad from it.');
    numberedBullet(3, 'Install Debian with a minimal desktop (or no desktop) — decline network mirror setup since there is no network. Set a strong disk encryption passphrase (LUKS).');
    numberedBullet(4, 'After install, transfer the Sparrow/Electrum installer via a second USB stick and install it. Verify its GPG signature offline against the publisher key you brought with you.');
    numberedBullet(5, 'Never plug in a USB stick that has touched an internet-connected machine without scanning it on a disposable environment first, and never enable networking.');

    heading('Step 6 — Install Sparrow or Electrum Offline');

    para('Both wallets run perfectly offline — they only need the internet to broadcast transactions, which you will do from your online machine instead.');

    bullet('Sparrow Wallet: The recommended desktop wallet for air-gapped setups. It supports all major hardware signers, multisig, coin control, and QR-based PSBT import/export. Install it from the .deb or AppImage transferred via USB.');
    bullet('Electrum: A lightweight alternative with strong offline-signing support. Electrum can import and sign partially-signed Bitcoin transactions (PSBTs) and export them for broadcast.');
    bullet('Create or import your wallet on the offline machine. Write down your seed phrase on paper or stamp it into steel — never store it digitally on any device.');

    heading('Step 7 — The Air-Gapped Signing Workflow');

    para('The signing workflow keeps the private keys offline at all times. Only unsigned and signed transaction files (PSBTs) ever cross the air gap.');

    subheading('Via QR Codes (Preferred)');
    numberedBullet(1, 'On your online computer (or a watch-only copy of the wallet on your phone), construct the transaction and export it as a PSBT.');
    numberedBullet(2, 'Display the PSBT as an animated QR code on the online machine\'s screen.');
    numberedBullet(3, 'On the offline ThinkPad, open Sparrow or Electrum and scan the QR code with a USB webcam.');
    numberedBullet(4, 'Review the transaction details carefully on the offline machine, then sign it. The signed PSBT is displayed as an animated QR code in return.');
    numberedBullet(5, 'Scan the signed QR back into your online machine and broadcast it to the network.');

    subheading('Via microSD Card');
    numberedBullet(1, 'Save the unsigned PSBT to a microSD card on your online machine.');
    numberedBullet(2, 'Move the card to the ThinkPad, import the PSBT into Sparrow/Electrum, review and sign it.');
    numberedBullet(3, 'Save the signed PSBT back to the card, move it to the online machine, and broadcast.');
    numberedBullet(4, 'Format or wipe the card between uses to prevent stale transaction files from accumulating.');

    heading('Step 8 — Verify Your Setup');

    bullet('Confirm the OS reports no network interfaces (run ip a or ifconfig in a terminal — only the loopback should appear).');
    bullet('Confirm the BIOS shows no wireless devices detected.');
    bullet('Test the full signing workflow with a small transaction before relying on the setup for real funds.');
    bullet('Keep a written, offline record of your wallet configuration (descriptor, derivation paths) so you can restore on new hardware if the ThinkPad dies.');

    heading('Security Best Practices');

    bullet('Never connect the ThinkPad to any network — not Ethernet, not Wi-Fi, not Bluetooth, not a hotspot-tethered USB cable.');
    bullet('Only transfer files via USB sticks or microSD that you control, and prefer QR codes when possible since they cannot carry malware across the gap.');
    bullet('Keep the ThinkPad powered off and physically secured (safe) when not in use.');
    bullet('Do not install any software you did not download yourself and verify by GPG signature.');
    bullet('Consider using the ThinkPad as one key in a multisig quorum (e.g. 2-of-3) so a single device compromise cannot lose your funds.');
    bullet('Periodically boot the machine and confirm it still works — hardware can degrade. Keep your seed backup on steel so you can always recover on new hardware.');

    heading('Summary');

    para('An air-gapped ThinkPad gives you a cheap, fully open-source, verifiable Bitcoin signer with no wireless attack surface and no vendor lock-in. The principles that make it secure:');

    numberedBullet(1, 'Physically remove all wireless hardware — do not rely on software switches.');
    numberedBullet(2, 'Lock down the BIOS with a supervisor password and disable network boot.');
    numberedBullet(3, 'Run a minimal, verified OS (Tails or Debian) and never connect it to the internet.');
    numberedBullet(4, 'Sign transactions over an air gap using QR codes or microSD — keys never touch a network.');
    numberedBullet(5, 'Back up your seed phrase on steel, and keep an offline record of your wallet descriptor.');

    para('Done correctly, this setup gives you a level of sovereignty and security that rivals commercial hardware wallets — built from hardware you already own, with software you can audit, and a design you fully understand.');

    const totalPages = addPageNumbers();

    const pdfBytes = doc.output('arraybuffer');
    const file = new File([pdfBytes], 'Air-Gapped-ThinkPad-Guide.pdf', { type: 'application/pdf' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ file_url: result.file_url, pages: totalPages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});