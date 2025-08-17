import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { parseConsultantsCSV } from './csvParser';
import { geocodeConsultants } from './geocodingService';
import { Consultant } from './types';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let consultantsData: Consultant[] = [];
let dataLoaded = false;

// In production (compiled), __dirname is 'dist', so we need to go up one more level
const isProduction = __dirname.endsWith('dist');
const rootDir = isProduction ? path.join(__dirname, '..') : path.join(__dirname, '..');

const CACHE_FILE = path.join(rootDir, 'consultants-with-coords.json');
const CSV_FILE = path.join(rootDir, 'consultants.csv');

const loadConsultantsData = async () => {
  try {
    console.log('Looking for cache at:', CACHE_FILE);
    console.log('Cache file exists:', fs.existsSync(CACHE_FILE));
    
    if (fs.existsSync(CACHE_FILE)) {
      console.log('Loading consultants from cache...');
      const cacheData = fs.readFileSync(CACHE_FILE, 'utf-8');
      consultantsData = JSON.parse(cacheData);
      console.log(`Loaded ${consultantsData.length} consultants from cache`);
    } else {
      console.log('No cache found. Parsing CSV and geocoding...');
      const parsedConsultants = await parseConsultantsCSV(CSV_FILE);
      consultantsData = await geocodeConsultants(parsedConsultants);
      
      fs.writeFileSync(CACHE_FILE, JSON.stringify(consultantsData, null, 2));
      console.log(`Cached ${consultantsData.length} consultants with coordinates`);
    }
    
    dataLoaded = true;
  } catch (error) {
    console.error('Error loading consultants data:', error);
  }
};

app.get('/api/consultants', (req, res) => {
  if (!dataLoaded) {
    return res.status(503).json({ error: 'Data is still loading. Please try again in a moment.' });
  }
  
  res.json(consultantsData);
});

app.get('/api/consultants/:id', (req, res) => {
  if (!dataLoaded) {
    return res.status(503).json({ error: 'Data is still loading. Please try again in a moment.' });
  }
  
  const consultant = consultantsData.find(c => c.id === req.params.id);
  
  if (!consultant) {
    return res.status(404).json({ error: 'Consultant not found' });
  }
  
  res.json(consultant);
});

app.get('/api/reload', async (req, res) => {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      fs.unlinkSync(CACHE_FILE);
    }
    
    dataLoaded = false;
    await loadConsultantsData();
    
    res.json({ 
      message: 'Data reloaded successfully', 
      count: consultantsData.length 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reload data' });
  }
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    dataLoaded,
    consultantCount: consultantsData.length 
  });
});

loadConsultantsData();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});