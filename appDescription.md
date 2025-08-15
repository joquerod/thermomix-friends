Let's start over. 
Remove the App and create a new one. We'll keep a similar plan with some changes:
This app uses redux and typescript.
This app is about showing thermomix friends on a map of united states so they know how where to find thermomix friends near their area or also called consultants.
I have a cvs as data source that can be stored by a backend.
The cvs file divided by commas that has around 1300 records like this:

Identifier, Consultant, Branch, Lead, City, Zipcode
100009, Paula Fernandez del Tejo, Miami, Maria Laino Dondiz, Boise, 83716

Branch: Is the office where they report to
Lead: Team Lead
Consultant: Consultant name
City: Consultant's city
Zipcode: Consultant's zipcode

This app needs to plot a pin for each consultant.
Many consultants can share a zipcode or city, and we don't have a specific address so we need a representative coordinate of that location to plot it on the map.
If several consultants have the same zipcode, city, the pins should have some distance between them so a user can tap it to see more information
When a user taps a pin, we can show a little pop up with this information: Branch, Lead, Consultant, Zipcode, City

Challenge:
The cvs does not have coordinates information, so we need to consume a free API that can give us some coordinates with latitude, longitud based on a city name or zipcode
This heavy lifting should be done by the backend only once and persist this data on disk
The client side, a wepage will load with a map, and will call an api that will return a list of consultants with all above information, but also including coordinates to plot a pin on the map
Since we're talking about 1300 records I'm open to ideas.
Either we keep those records in the client and we only fetch coordinates or we keep the whole data in the backend and the client downloads all data during intialization the first time
After that the client doesn't need to make extra calls
The geocoding part (obtaining coordinates by zipcode) can be a challenge because the APIs that can do this won't process 1300 records all at once so you should plan a strategy
We have 1300 records but they probably share zipcodes, so first you should make a list with unique zipcodes or cities, and get the corresponding coordinates for that data

