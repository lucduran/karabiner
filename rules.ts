import fs from "fs";
import { KarabinerRules } from "./types";
import { app, createHyperSubLayers, open } from "./utils";

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
            }
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
      {
        type: "basic",
        description: "Disable CMD + Tab to force Hyper Key usage",
        from: {
          key_code: "tab",
          modifiers: {
            mandatory: ["left_command"],
          },
        },
        to: [
          {
            key_code: "tab",
          },
        ],
      },
    ],
  },
  ...createHyperSubLayers({
    spacebar: app("GCal for Google Calendar"),

    p: open("raycast://extensions/thomas/spotify-controls/play"),

    // Remap quote to backspace with hyper
    quote: {
      to: [
        {
          key_code: "delete_or_backspace",
        },
      ],
    },

    // o = "Open" applications
    o: {
      b: app("Brave Browser"),
      v: app("Visual Studio Code"),
      m: app("Messages"),
      f: app("Finder"),
      t: app("iTerm"),
      n: app("Notes"),
      l: app("Prism Launcher"),
      k: app("Fabulously Optimized 5.12.0-alpha.4"),
      p: app("Spotify"),
      d: app("Discord"),
      a: app("Airtable"),
      g: app("Google Chrome"),
      s: app("Slack"),
      c: app("ChatGPT"),
      y: app("System Settings"),
    },

    // b = "B"rowse
    b: {
      y: open("https://www.youtube.com"),
      h: open("https://www.hckrnws.com/top/1"),
      c: open("https://chat.openai.com"),
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
      w: {
        to: [
          {
            shell_command: `open -a "Google Chrome" "https://editor.weweb.io/47aa0874-ee85-4f94-bdd0-4d864392c9a1"`
          }
        ]
      },

      // "X"ano
      x: {
        to: [
          {
            shell_command: `open -a "Google Chrome" "https://xdw0-sipj-awhp.n7.xano.io/workspace/3-0/dashboard"`
          }
        ]
      },

      // "F"igma
      f: {
        to: [
          {
            shell_command: `open -a "Google Chrome" "https://www.figma.com/board/9GuvEeOWjf71XS4jRBeFi1/renter-application-flow?node-id=3-82&t=YPZJ5hcjYQVxLqj4-0"`
          }
        ]
      },
    },

    // w = "Window" via Amethyst.app
    w: {
      // Focus manipulation
      k: {
        description: "Amethyst: Move Focus Counter Clockwise",
        to: [
          {
            key_code: "k",
            modifiers: ["option", "shift"],
          },
        ],
      },
      l: {
        description: "Amethyst: Move Focus Clockwise",
        to: [
          {
            key_code: "l",
            modifiers: ["option", "shift"],
          },
        ],
      },
      j: {
        description: "Amethyst: Swap Focus To Counter Clockwise Screen",
        to: [
          {
            key_code: "j",
            modifiers: ["option", "shift"],
          },
        ],
      },
      semicolon: {
        description: "Amethyst: Swap Focus To Clockwise Screen",
        to: [
          {
            key_code: "semicolon",
            modifiers: ["option", "shift"],
          },
        ],
      },

      // Window swapping
      i: {
        description: "Amethyst: Swap Focused Window Counter Clockwise",
        to: [
          {
            key_code: "i",
            modifiers: ["option", "shift"],
          },
        ],
      },
      o: {
        description: "Amethyst: Swap Focused Window Clockwise",
        to: [
          {
            key_code: "o",
            modifiers: ["option", "shift"],
          },
        ],
      },
      u: {
        description: "Amethyst: Swap Focused Window Counter Clockwise Screen",
        to: [
          {
            key_code: "u",
            modifiers: ["option", "shift"],
          },
        ],
      },
      p: {
        description: "Amethyst: Swap Focused Window Clockwise Screen",
        to: [
          {
            key_code: "p",
            modifiers: ["option", "shift"],
          },
        ],
      },
      return_or_enter: {
        description: "Amethyst: Swap Focused Window with Main Window",
        to: [
          {
            key_code: "return_or_enter",
            modifiers: ["option", "shift"],
          },
        ],
      },
      t: {
        description: "Amethyst: Toggle Float for Focused Window",
        to: [
          {
            key_code: "t",
            modifiers: ["option", "shift"],
          },
        ],
      },

      // Window size manipulation
      comma: {
        description: "Amethyst: Shrink Main Pane",
        to: [
          {
            key_code: "comma",
            modifiers: ["option", "shift"],
          },
        ],
      },
      period: {
        description: "Amethyst: Expand Main Pane",
        to: [
          {
            key_code: "period",
            modifiers: ["option", "shift"],
          },
        ],
      },

      // Layout change
      f: {
        description: "Amethyst: Toggle 'Fullscreen' Layout",
        to: [
          {
            key_code: "f",
            modifiers: ["option", "shift"],
          },
        ],
      },
      g: {
        description: "Amethyst: Toggle 'Tall' Layout",
        to: [
          {
            key_code: "g",
            modifiers: ["option", "shift"],
          },
        ],
      },

      // Spaces manipulation
      m: {
        description: "Amethyst: Throw Focused Window to Space Left",
        to: [
          {
            key_code: "m",
            modifiers: ["option", "shift"],
          },
        ],
      },
      slash: {
        description: "Amethyst: Throw Focused Window to Space Right",
        to: [
          {
            key_code: "slash",
            modifiers: ["option", "shift"],
          },
        ],
      },

      z: {
        description: "Amethyst: Restart Amethyst",
        to: [
          {
            key_code: "z",
            modifiers: ["option", "shift"],
          },
        ],
      },

      // System navigation
      h: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      q: {
        description: "Quit Current App",
        to: [
          {
            key_code: "q",
            modifiers: ["right_command"],
          },
        ],
      },
      e: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      r: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      b: {
        to: [
          {
            shell_command: `/opt/homebrew/bin/brew services restart sketchybar`,
          },
        ],
      },
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            // Lock screen native shortcut
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      e: {
        to: [
          {
            // Emoji picker
            key_code: "spacebar",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      // Mullvad VPN controls
      c: open("raycast://script-commands/connect"),
      d: open("raycast://script-commands/disconnect"),

      // Airpods Pro controls
      // TODO: Fix extention toggle between wrong modes
      t: open("raycast://extensions/chrahe/airpods-noise-control/index"),

      q: open("raycast://extensions/raycast/system/quit-all-applications"),

      // Turn on Elgato KeyLight
      /* y: {
        to: [
          {
            shell_command: `curl -H 'Content-Type: application/json' --request PUT --data '{ "numberOfLights": 1, "lights": [ { "on": 1, "brightness": 100, "temperature": 215 } ] }' http://192.168.8.84:9123/elgato/lights`,
          },
        ],
      },
      h: {
        to: [
          {
            shell_command: `curl -H 'Content-Type: application/json' --request PUT --data '{ "numberOfLights": 1, "lights": [ { "on": 0, "brightness": 100, "temperature": 215 } ] }' http://192.168.8.84:9123/elgato/lights`,
          },
        ],
      }, */
      // "N"otifications-Do not disturb toggle
      n: open(`raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`),
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      j: {
        to: [{ key_code: "left_arrow" }],
      },
      k: {
        to: [{ key_code: "down_arrow" }],
      },
      l: {
        to: [{ key_code: "up_arrow" }],
      },
      semicolon: {
        to: [{ key_code: "right_arrow" }],
      },
      // Magicmove via Homerow.app
      m: {
        to: [{ key_code: "m", modifiers: ["right_control"] }],
      },
      // Search via homerow.app
      n: {
        to: [{ key_code: "n", modifiers: ["right_control"] }],
      },
      // Scroll mode via homerow.app
      s: {
        to: [{ key_code: "s", modifiers: ["right_control"] }],
      },
      i: {
        to: [{ key_code: "page_down" }],
      },
      o: {
        to: [{ key_code: "page_up" }],
      },
    },

    // c = Musi*c* which is not "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      m: {
        // Next song
        to: [{ key_code: "fastforward" }],
      },
      n: {
        // Previous song
        to: [{ key_code: "rewind" }],
      },
    },

    // r = "Raycast"
    r: {
      a: open("raycast://extensions/third774/perplexity/ask-perplexity"),
      // "C"lear notifications
      c: open("raycast://script-commands/dismiss-notifications"),
      l: open(
        "raycast://extensions/stellate/mxstbr-commands/create-mxs-is-shortlink"
      ),
      // m: open("raycast://script-commands/google-maps?arguments=&arguments="),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      s: open("raycast://extensions/peduarte/silent-mention/index"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      1: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
      ),
      2: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
      ),
    },

  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);

/* Hide Dock
defaults write com.apple.dock autohide -bool true && killall Dock
defaults write com.apple.dock autohide-delay -float 1000 && killall Dock
defaults write com.apple.dock no-bouncing -bool TRUE && killall Dock

defaults write com.apple.dock autohide -bool false && killall Dock
defaults delete com.apple.dock autohide-delay && killall Dock
defaults write com.apple.dock no-bouncing -bool FALSE && killall Dock */

// defaults write com.knollsoft.Rectangle screenEdgeGapTop -int 45