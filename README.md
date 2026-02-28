# Indian Mining Drilling Logger

A professional web application for logging drilling information and analytics dashboard designed specifically for Indian mining operations.

![Dashboard Preview](https://img.shields.io/badge/Dashboard-Analytics-orange)
![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

## Features

### Drilling Log Management
- **Comprehensive Log Entry**: Record drill hole data including depth, recovery, rock types, and more
- **Indian Mining Context**: Pre-configured with 40+ Indian mine sites across Coal India, NMDC, Tata Steel, SAIL, and more
- **GPS Coordinates**: Track exact drilling locations
- **Sample Tracking**: Record sample IDs and types for laboratory analysis

### Analytics Dashboard
- **Real-time Statistics**: Total meters drilled, hole count, core recovery rates
- **Visual Charts**: 
  - Drilling progress over time (line chart)
  - Core recovery by mine (bar chart)
  - Drilling methods distribution (pie chart)
  - Top mines by drilling volume
- **Recent Activity**: Quick view of latest drilling logs

### Data Management
- **Search & Filter**: Find logs by mine, date, rock type, drilling method
- **Export to CSV**: Download all data for reporting
- **Local Storage**: Data persists in browser (no server required)
- **Sample Data**: Pre-loaded with example drilling logs

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui patterns
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vivek-yast/indian-mining-drilling-logger.git
cd indian-mining-drilling-logger
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

The static files will be generated in the `dist` folder.

## Usage

### Creating a New Drilling Log
1. Click "New Log" from the dashboard
2. Select the mine site (auto-populates company and GPS coordinates)
3. Enter drill hole ID and drilling details
4. Record depth, recovery percentage, and geological information
5. Save the log

### Viewing Analytics
- The dashboard displays key metrics and charts automatically
- Filter logs to see specific time periods or mines
- Export data for external analysis

### Managing Logs
- View all logs in the "View Logs" section
- Search and filter by multiple criteria
- Edit or delete existing logs
- Export filtered results to CSV

## Supported Mine Sites

The application includes pre-configured data for:

### Coal Mines
- Jharia Coalfield (CIL)
- Raniganj Coalfield (CIL)
- Korba Coalfield (CIL)
- Talcher Coalfield (CIL)
- Singrauli Coalfield (CIL)
- Kothagudem (SCCL)
- Bellampalli (SCCL)
- And more...

### Iron Ore Mines
- Kirandul (NMDC)
- Bailadila (NMDC)
- Donimalai (NMDC)
- Noamundi (Tata Steel)
- Joda (Tata Steel)
- Kiriburu (SAIL)
- And more...

### Other Minerals
- Lanjigarh Bauxite (Vedanta)
- Rampura Agucha Zinc (HZL)
- Jaduguda Uranium (UCIL)
- And more...

## Data Structure

Each drilling log includes:
- Mine site and company information
- Drill hole identification
- Date and time of drilling
- Depth measurements (from/to/total)
- Rock type and formation
- Core recovery percentage
- Drilling method and equipment
- Geologist/engineer name
- Sample details
- GPS coordinates
- Notes and observations

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use for your mining operations!

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Support

For questions or support, please open an issue on GitHub.

---

Built for the Indian mining industry with ❤️