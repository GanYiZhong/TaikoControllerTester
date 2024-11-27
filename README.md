# Taiko Controller Tester

https://tktest.taiko.ac/

A web-based application for testing and visualizing Taiko drum controller inputs. Perfect for practicing rhythms and testing your Taiko controller's responsiveness.

## Features

- Real-time input visualization for Taiko drum controls
- Distinct sounds for "Don" (center) and "Ka" (rim) hits
- Visual feedback with color-coded hits
- Hit counter with auto-reset after 5 seconds of inactivity
- Customizable key bindings
- Volume control
- Visual timeline showing recent hits
- Responsive design that works on all devices

## Controls (Customizable)

Default controls:
- **D Key**: Left Ka (Rim)
- **F Key**: Left Don (Center)
- **J Key**: Right Don (Center)
- **K Key**: Right Ka (Rim)

Click the keyboard icon to customize key bindings.

## Sound Details

The application uses the Web Audio API to generate authentic Taiko drum sounds:

### Ka (Rim) Sound
- Frequency: 800Hz
- Duration: 0.1s
- Volume: 30% of master volume

### Don (Center) Sound
- Frequency: 300Hz
- Duration: 0.15s
- Volume: 50% of master volume

## Technical Details

Built with:
- React 18
- TypeScript
- Tailwind CSS
- Web Audio API
- Vite

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for any purpose.

## Support

If you find this tool useful, consider supporting the development:
- Visit [ZhongTaiko](https://taiko.ac)

## Credits

Created by ZhongTaiko Studio - A Taiko Controller Provider.