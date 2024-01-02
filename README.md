# Racepulse | F1 Edition Visualizer

Racepulse is an unofficial visualizer for Formula 1 races from 1996 onwards. The site provides an engaging experience for F1 enthusiasts, allowing them to explore race data, driver details, and visualizations.

![racepulse](https://github.com/ErosKarm/racepulse/assets/48349453/c8c05f19-82c5-44d8-8ba1-b7244255f884)

## Features

1. **Dynamic Race Visualization:**

   - Select a year and round to explore races.
   - Choose a lap or click play to witness the evolution of the gap to the leader over time.

2. **Driver Information:**

   - Two driver selection boxes for in-depth information.
   - Real-time updates based on lap changes.
   - Data includes:
     - Driver position
     - Driver name
     - Driver team (constructor)
     - Driver's current lap time
     - Gap to the leader
     - Previous lap time
     - Gap ahead (to the driver in the forward position)
     - Constructor (team the driver is driving for)
     - Starting position
     - Current position
     - Gained positions

3. **Data Source:**

   - Utilizes the ERGAST API for race data.
   - All copyright for the data belongs to ERGAST.

4. **D3.js Scattergraph:**
   - Visual representation of all drivers and their gaps on a scattergraph.

## Technologies Used

- **Next.js:**
  - React framework for building web applications.
- **ShadCN with Tailwind:**
  - Styling using ShadCN in conjunction with Tailwind CSS for a responsive and visually appealing design.

## Note

- **Mobile Viewing:**
  - Discouraged: Strange behavior may occur when viewing on mobile devices.

## Developer

- **Eros Karm:**
  - GitHub: [ErosKarm](https://github.com/ErosKarm)

## Acknowledgments

- **Data Source:**
  - ERGAST API (All copyrights to ERGAST for the data).

## How to Use

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ErosKarm/Racepulse-F1-Edition.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run application**

   ```bash
   npm run dev
   ```

- The application will be accessible at http://localhost:3000.

Feel free to explore, contribute, and provide feedback to enhance the Racepulse | F1 Edition Visualizer!
