import * as fs from 'fs';
import { KarabinerRules } from './types';
import { createHyperSubLayers, app, open, rectangle } from './utils';

const rules: KarabinerRules[] = [
  
  {
    description: 'Hyper Key (⌃⌥⇧⌘)',
    manipulators: [
      {
        description: 'Caps Lock -> Hyper Key',
        from: {
          key_code: 'caps_lock',
          modifiers: {
            optional: ['any'],
          },
        },
        to: [
          {
            set_variable: {
              name: 'hyper',
              value: 1
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: 'hyper',
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: 'escape',
          },
        ],
        type: 'basic',
      },
      /*       {
              type: 'basic',
              description: 'Disable CMD + Tab to force Hyper Key usage',
              from: {
                key_code: 'tab',
                modifiers: {
                  mandatory: ['left_command'],
                },
              },
              to: [
                {
                  key_code: 'tab',
                },
              ],
            }, */
    ],
  },
  ...createHyperSubLayers({

    // Remap hyper + quote to delete
    quote: { to: [{ key_code: 'delete_or_backspace', },], },

    // Create new reminder
    spacebar: open('raycast://extensions/mblode/quick-event/index'),

    // Cursor & scroll control via homerow.app
    a: { to: [{ key_code: 'm', modifiers: ['left_option', 'left_shift'] }], },
    // Scroll mode via homerow.app
    q: { to: [{ key_code: 's', modifiers: ['left_option', 'left_shift'] }], },
    // Search via homerow.app
    z: { to: [{ key_code: 'n', modifiers: ['left_option', 'left_shift'] }], },

    // Raycast shortcut
    f: { to: [{ key_code: 'spacebar', modifiers: ['command'], },], },
    // Quick minimize active window
    d: { to: [{ key_code: 'm', modifiers: ['command'], },], },
    // w = 'Window' via rectangle.app
    w: {
      // Window resizing
      j: rectangle('left-half'),
      semicolon: rectangle('right-half'),
      u: rectangle('top-left'),
      p: rectangle('top-right'),
      i: rectangle('bottom-left'),
      o: rectangle('bottom-right'),
      f: rectangle('maximize'),
      // Command + Tab remap
      comma: { to: [{ key_code: 'tab', modifiers: ['command', 'shift'], },], },
      period: { to: [{ key_code: 'tab', modifiers: ['command'], },], },
      // Move between displays
      m: rectangle('previous-display'),
      slash: rectangle('next-display'),
      // Move between spaces
      k: { to: [{ key_code: 'left_arrow', modifiers: ['control'], },], },
      l: { to: [{ key_code: 'right_arrow', modifiers: ['control'], },], },
      // Create new
      t: { to: [{ key_code: 't', modifiers: ['command'], },], },
      n: { to: [{ key_code: 'n', modifiers: ['command'], },], },
      // Tab nagivation
      e: { to: [{ key_code: 'open_bracket', modifiers: ['command', 'shift'], },], },
      r: { to: [{ key_code: 'close_bracket', modifiers: ['command', 'shift'], },], },
      // Webpage nagivation
      3: { to: [{ key_code: 'open_bracket', modifiers: ['command'], },], },
      4: { to: [{ key_code: 'close_bracket', modifiers: ['command'], },], },
      5: { to: [{ key_code: 'l', modifiers: ['command'], },], },
    },

    // o = 'Open' applications
    o: {
      b: app('Brave Browser'),
      f: app('Finder'),
      y: app('System Settings'),
      m: app('Messages'),
      h: app('Snapchat'),
      // Productivity
      c: app('Calendar'),
      r: app('Reminders'),
      a: app('ChatGPT'),
      n: app('Notes'),
      v: app('Visual Studio Code'),
      t: app('iTerm'),
      p: app('PyCharm CE'),
      // Work
      s: app('Slack'),
      g: app('Google Chrome'),
      k: app('Airtable'),
      e: app('Figma'),
    },

  // g = 'Games'
  g: {
    s: app("Steam"),
    d: app('Discord'),
    m: app('Prism Launcher'),
    h: app("SUPERHOT MIND CONTROL DELETE"),
    c: app("Cuphead"),
  },

    // b = 'B'rowse
    b: {
      h: open('https://news.ycombinator.com/news'),
      c: open('https://classpass.com/search'),
      s: open('https://client.schwab.com/clientapps/accounts/summary/'),
      n: open('https://app.ynab.com/fe910454-0ccd-4e4d-95f5-fc6f1545d0bf/budget'),
      m: open('https://www.google.com/maps'),
      e: open('https://mail.google.com/mail/u/0/'),
      a: open('https://www.amazon.com/'),
      p: open('https://www.perplexity.ai/'),
      g: open('https://github.com/lucduran/'),
      y: open('https://www.youtube.com/'),
      l: open('https://learning.edx.org/course/course-v1:HarvardX+CS50P+Python/home'),
      u: { to: [{ shell_command: '/opt/homebrew/bin/code -n ~/.config' }] },
      // 'W'eWeb
      w: { to: [{ shell_command: 'open -a \'Google Chrome\' \'https://editor.weweb.io/47aa0874-ee85-4f94-bdd0-4d864392c9a1\'' }] },
      // 'X'ano
      x: { to: [{ shell_command: 'open -a \'Google Chrome\' \'https://xdw0-sipj-awhp.n7.xano.io/workspace/3-0/dashboard\'' }] },
    },

    c: {
      // Media controls
      p: { to: [{ key_code: 'play_or_pause' }], },
      m: { to: [{ key_code: 'fastforward' }], },
      n: { to: [{ key_code: 'rewind' }], },
    },

    // s = 'System'
    s: {
      // Volume control
      u: { to: [{ key_code: 'volume_increment', },], },
      j: { to: [{ key_code: 'volume_decrement', },], },
      // Brightness control
      i: { to: [{ key_code: 'display_brightness_increment', },], },
      k: { to: [{ key_code: 'display_brightness_decrement', },], },
      // Lock screen
      l: { to: [{ key_code: 'q', modifiers: ['right_control', 'right_command'], },], },
      // Emoji picker
      e: { to: [{ key_code: 'spacebar', modifiers: ['right_control', 'right_command'], },], },
      // Caffeinate toggle
      // a = 'A'wake
      a: open('raycast://extensions/mooxl/coffee/caffeinateToggle?launchType=background'),
      // Clipboard history
      h: open('raycast://extensions/raycast/clipboard-history/clipboard-history'),
      // Connect Airpods Pro
      1: open('raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1?launchType=background'),
      // Airpods Pro controls
      t: open('raycast://extensions/chrahe/airpods-noise-control/index?launchType=background'),
      // Quit all applications
      q: open('raycast://extensions/raycast/system/quit-all-applications?launchType=background'),
      // 'N'otifications-Do not disturb toggle
      d: open(`raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`),
    },

    // v = 'moVe' which isn't 'm' because we want it to be on the left hand
    // so that jkl; work like they do in vim with hjkl
    v: {
      j: { to: [{ key_code: 'left_arrow' }], },
      k: { to: [{ key_code: 'down_arrow' }], },
      l: { to: [{ key_code: 'up_arrow' }], },
      semicolon: { to: [{ key_code: 'right_arrow' }], },
      i: { to: [{ key_code: 'page_down' }], },
      o: { to: [{ key_code: 'page_up' }], },
    },

    // h = 'H'ome
    // One day this will be for Home Assistant when I can afford a home :)
    h: {},
  }),
];

fs.writeFileSync('karabiner.json', JSON.stringify({ global: { show_in_menu_bar: false, }, profiles: [{ name: 'Luc\'s Godly Keyboard', complex_modifications: { rules }, },], }, null, 2));

/* == Hide Dock ==
defaults write com.apple.dock autohide -bool true && killall Dock
defaults write com.apple.dock autohide-delay -float 1000 && killall Dock
defaults write com.apple.dock no-bouncing -bool TRUE && killall Dock
== Show Dock ==
defaults write com.apple.dock autohide -bool false && killall Dock
defaults delete com.apple.dock autohide-delay && killall Dock
defaults write com.apple.dock no-bouncing -bool FALSE && killall Dock

== Remap default music service via notunes.app ==
defaults write digital.twisted.noTunes replacement /Applications/YOUR_MUSIC_APP.app
defaults write digital.twisted.noTunes replacement https://music.youtube.com/
== Restore default music service ==
defaults delete digital.twisted.noTunes replacement*/