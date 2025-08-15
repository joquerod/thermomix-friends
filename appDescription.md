# Thermomix Friends Locator

## Purpose
The Thermomix Friends Locator is a web application designed to help Thermomix customers discover and connect with certified consultants (also known as "Thermomix Friends") in their local area across the United States. This tool bridges the gap between customers seeking product support, demonstrations, or purchasing assistance and the network of trained consultants who can provide these services.

## What It Does
The application displays an interactive map of the United States with pins representing the locations of Thermomix consultants. Users can:

- **Explore the Map**: View the geographic distribution of consultants across the country
- **Find Local Support**: Locate consultants in their area or regions they plan to visit
- **Get Consultant Details**: Click on any pin to see detailed information about the consultant
- **Understand the Network**: See how consultants are organized by branches and team leads

## Target Users
- **Thermomix Customers**: People who own Thermomix devices and need local support, training, or accessories
- **Potential Customers**: Individuals interested in Thermomix products who want to connect with a consultant for demonstrations or purchasing
- **Consultants**: Team members who want to understand the geographic distribution of their network
- **Regional Managers**: Leadership who need to visualize consultant coverage across territories

## Technical Approach
The application solves the challenge of displaying 1,369 consultant records on a map by:

### Data Processing
- **CSV Source**: Processes consultant data from a structured CSV file containing identifiers, names, branch assignments, team leads, cities, and zipcodes
- **Geocoding**: Automatically converts zipcode data to GPS coordinates using free geocoding APIs
- **Optimization**: Processes only unique zipcodes (908 from 1,369 records) to minimize API calls
- **Caching**: Stores geocoded results to avoid repeated API requests

### User Experience
- **Pin Management**: Automatically spaces overlapping pins when multiple consultants share the same zipcode
- **Information Display**: Shows comprehensive consultant details in interactive popups including:
  - Consultant name
  - Branch office affiliation  
  - Team lead
  - City and zipcode
  - Original system identifier
- **Performance**: Loads all data once during initialization for smooth interaction

### Technical Stack
- **Frontend**: React with TypeScript and Redux for state management
- **Mapping**: Leaflet.js for interactive map functionality
- **Backend**: Node.js with Express for data processing and API services
- **Data Persistence**: JSON caching for geocoded coordinates

## Business Value
This application enhances the Thermomix customer experience by making it easy to find local support and creates transparency in the consultant network. It supports both customer acquisition (helping prospects find local consultants) and customer retention (helping existing customers find ongoing support).

