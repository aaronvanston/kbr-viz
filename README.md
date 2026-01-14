# Keyboard Visualizer

A real-time keyboard visualization app that displays your keyboard layout and highlights keys as you type. Built with Next.js, Tailwind CSS, and Shadcn/UI.

## Features

- **Real-time key highlighting** - See keys light up as you press them
- **Visited state tracking** - Keys you've pressed stay highlighted with a green indicator
- **Event log** - View keydown, keyup, and keypress events with timestamps
- **Full keyboard layout** - ANSI QWERTY with function keys, modifiers, navigation cluster, and arrow keys
- **Numpad toggle** - Show/hide the number pad
- **Dark/Light/System theme** - Automatic theme detection with manual toggle
- **Modifier tracking** - See when Shift, Ctrl, Alt, or Cmd are held

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework with App Router & Turbopack
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Shadcn/UI](https://ui.shadcn.com/) - Accessible component library
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management
- [Ultracite](https://ultracite.dev/) + [Biome](https://biomejs.dev/) - Linting and formatting

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Lint code
bun run lint
```

Open [http://localhost:3000](http://localhost:3000) and start typing to see the visualizer in action.

## License

MIT
