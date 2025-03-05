# Number Comparison App

A full-stack application that compares numbers between JSON files, built with React and FastAPI.

## Features

- Upload and display JSON files containing arrays of numbers
- Highlight numbers that appear in both the default and uploaded files
- Show detailed statistics and comparisons
- Interactive UI with tooltips and visual feedback
- Sample files provided for testing

## Tech Stack

### Frontend
- React
- Modern CSS with Flexbox and Grid
- File handling with FileReader API

### Backend
- FastAPI
- Python 3.7+
- Uvicorn ASGI server

## Project Structure

```
.
├── frontend/               # React frontend
│   ├── public/            # Static files
│   │   ├── numbers.json   # Default numbers
│   │   └── sample.json    # Sample file
│   └── src/               # React source code
│       ├── components/    # React components
│       ├── App.js         # Main React component
│       └── App.css        # Styles
└── server.py              # FastAPI backend
```

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/number-comparison-app.git
   cd number-comparison-app
   ```

2. Set up the backend:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```bash
   python server.py
   ```
   The backend will be available at http://localhost:8000

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```
   The frontend will be available at http://localhost:3000

## Usage

1. Open http://localhost:3000 in your browser
2. You'll see the default numbers displayed
3. Use the file upload button to upload your own JSON file
4. Numbers that appear in both files will be highlighted in yellow
5. View statistics and comparisons below the numbers
6. Use the sample files provided to test the functionality

## API Documentation

The FastAPI backend provides automatic API documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for any purpose.