import * as fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, yabai } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({

    // Remap delete to hyper + quote
    quote: { to: [ { key_code: "delete_or_backspace", }, ], },

    spacebar: open("raycast://extensions/raycast/apple-reminders/create-reminder"),

    // Quick switch active window
    f: { to: [{ key_code: "tab", modifiers: ["command"], },], },
    // Quick hide active window
    d: { to: [ { key_code: "h", modifiers: ["command"], }, ], },

    // w = "Window" via yabai
    w: {
      // Make window go away
      d: { to: [ { key_code: "w", modifiers: ["command"], }, ], },
      q: { to: [ { key_code: "q", modifiers: ["command"], }, ], },
      z: yabai("--restart-service"),
      // Tab nagivation
      t: { to: [ { key_code: "t", modifiers: ["command"], }, ], },
      e: { to: [ { key_code: "open_bracket", modifiers: ["command", "shift"], }, ], },
      r: { to: [ { key_code: "close_bracket", modifiers: ["command", "shift"], }, ], },
      // Webpage nagivation
      3: { to: [ { key_code: "open_bracket", modifiers: ["command"], }, ], },
      4: { to: [ { key_code: "close_bracket", modifiers: ["command"], }, ], },
      5: { to: [ { key_code: "l", modifiers: ["command"], }, ], },
      // Create new window/tab
      f: { to: [ { key_code: "n", modifiers: ["command"], }, ], },
      // Focus manipulation
      j: yabai("-m window --focus west"),
      semicolon: yabai("-m window --focus east"),
      k: yabai("-m window --focus south"),
      l: yabai("-m window --focus north"),
      quote: { to: [ { key_code: "right_arrow", modifiers: ["control"], }, ], },
      h: { to: [ { key_code: "left_arrow", modifiers: ["control"], }, ], },
      // Window swapping
      u: yabai("-m window --swap west"),
      p: yabai("-m window --swap east"),
      i: yabai("-m window --swap south"),
      o: yabai("-m window --swap north"),
      // Swap windows to spaces
      y: yabai("-m window --space prev"),
      open_bracket: yabai("-m window --space next"),
      // Window warping
      7: yabai("-m window --warp west"),
      0: yabai("-m window --warp east"),
      8: yabai("-m window --warp south"),
      9: yabai("-m window --warp north"),
      // Layout change
      b: yabai("-m space --balance"),
      period: yabai("-m space --rotate 270"),
      comma: yabai("-m space --rotate 90"),
    },

    // o = "Open" applications
    o: {
      b: app("Brave Browser"),
      f: app("Finder"),
      m: app("Messages"),
      // Productivity
      c: app("Calendar"),
      r: app("Reminders"),
      a: app("ChatGPT"),
      n: app("Notes"),
      v: app("Visual Studio Code"),
      t: app("iTerm"),
      // Work
      s: app("Slack"),
      g: app("Google Chrome"),
      k: app("Airtable"),
      e: app("Figma"),
      // Entertainment
      p: app("Spotify"),
      d: app("Discord"),
      l: app("Prism Launcher"),
      semicolon: app("Fabulously Optimized 5.12.0-alpha.4"),
    },

    // b = "B"rowse
    b: {
      y: open("https://www.youtube.com"),
      h: open("https://news.ycombinator.com/news"),
      c: open("https://classpass.com/search"),
      t: open("https://www.typingclub.com/sportal/program-3.game"),
      s: open("https://client.schwab.com/clientapps/accounts/summary/"),
      n: open("https://app.ynab.com/fe910454-0ccd-4e4d-95f5-fc6f1545d0bf/budget"),
      m: open("https://www.google.com/maps"),
      e: open("https://mail.google.com/mail/u/0/"),
      a: open("https://www.amazon.com/"),
      i: open("https://www.instagram.com/"),
      l: open("https://www.linkedin.com/"),
      g: open("https://github.com/lucduran/"),
      // "W"eWeb
      w: { to: [ { shell_command: `open -a "Google Chrome" "https://editor.weweb.io/47aa0874-ee85-4f94-bdd0-4d864392c9a1"` } ] },
      // "X"ano
      x: { to: [ { shell_command: `open -a "Google Chrome" "https://xdw0-sipj-awhp.n7.xano.io/workspace/3-0/dashboard"` } ] },
    },

    // c = musi"C"
    c: {
      p: open(`raycast://extensions/mattisssa/spotify-player/togglePlayPause?launchType=background`),
      m: open(`raycast://extensions/mattisssa/spotify-player/next?launchType=background`),
      n: open(`raycast://extensions/mattisssa/spotify-player/previous?launchType=background`),
      l: open(`raycast://extensions/mattisssa/spotify-player/like?launchType=background`),
      d: open(`raycast://extensions/mattisssa/spotify-player/dislike?launchType=background`),
      s: open(`raycast://extensions/mattisssa/spotify-player/nowPlaying`),
      r: open(`raycast://extensions/mattisssa/spotify-player/startRadio?launchType=background`),
      a: open(`raycast://extensions/mattisssa/spotify-player/cycleRepeat?launchType=background`),
      u: open(`raycast://extensions/mattisssa/spotify-player/copyUrl?launchType=background`),
    },

    // s = "System"
    s: {
      // Show hidden menu bar icons via Bartender.app
      b: { to: [ { key_code: "b", modifiers: ["option", "shift"], }, ], },
      // Volume control
      u: { to: [ { key_code: "volume_increment", }, ], },
      j: { to: [ { key_code: "volume_decrement", }, ], },
      // Brightness control
      i: { to: [ { key_code: "display_brightness_increment", }, ], },
      k: { to: [ { key_code: "display_brightness_decrement", }, ], },
      // Lock screen
      l: { to: [ { key_code: "q", modifiers: ["right_control", "right_command"], }, ], },
      // Media controls
      p: { to: [{ key_code: "play_or_pause" }], },
      m: { to: [{ key_code: "fastforward" }], },
      n: { to: [{ key_code: "rewind" }], },
      // Emoji picker
      e: { to: [ { key_code: "spacebar", modifiers: ["right_control", "right_command"], }, ], },
      // Mullvad VPN controls
      c: open("raycast://extensions/0x46616c6b/mullvad/connect?launchType=background"),
      v: open("raycast://extensions/0x46616c6b/mullvad/disconnect?launchType=background"),
      // Caffeinate toggle
      // a = "A"wake
      a: open("raycast://extensions/mooxl/coffee/caffeinateToggle?launchType=background"),
      // q = "Q"uestion
      // q: open("raycast://extensions/third774/perplexity/ask-perplexity"),
      // Clipboard history
      h: open( "raycast://extensions/raycast/clipboard-history/clipboard-history" ),
      // Connect Airpods and Beats Studio headphones
      1: open( "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1?launchType=background" ),
      2: open( "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2?launchType=background" ),
      // Airpods Pro controls
      // TODO: Fix extention toggle between wrong modes
      // t: open("raycast://extensions/chrahe/airpods-noise-control/index"),
      // Quit all applications
      q: open("raycast://extensions/raycast/system/quit-all-applications?launchType=background"),
      // "N"otifications-Do not disturb toggle
      d: open(`raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`),
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      j: { to: [{ key_code: "left_arrow" }], },
      k: { to: [{ key_code: "down_arrow" }], },
      l: { to: [{ key_code: "up_arrow" }], },
      semicolon: { to: [{ key_code: "right_arrow" }], },
      // Magicmove via homerow.app
      m: { to: [{ key_code: "m", modifiers: ["right_control"] }], },
      // Search via homerow.app
      n: { to: [{ key_code: "n", modifiers: ["right_control"] }], },
      // Scroll mode via homerow.app
      s: { to: [{ key_code: "s", modifiers: ["right_control"] }], },
      i: { to: [{ key_code: "page_down" }], },
      o: { to: [{ key_code: "page_up" }], },
    },

    // h = "H"ome
    h: {},
  }),
];

fs.writeFileSync( "karabiner.json", JSON.stringify( { global: { show_in_menu_bar: false, }, profiles: [ { name: "Default", complex_modifications: { rules, }, }, ], }, null, 2 ) );

/* Hide Dock
defaults write com.apple.dock autohide -bool true && killall Dock
defaults write com.apple.dock autohide-delay -float 1000 && killall Dock
defaults write com.apple.dock no-bouncing -bool TRUE && killall Dock

Show Dock
defaults write com.apple.dock autohide -bool false && killall Dock
defaults delete com.apple.dock autohide-delay && killall Dock
defaults write com.apple.dock no-bouncing -bool FALSE && killall Dock */