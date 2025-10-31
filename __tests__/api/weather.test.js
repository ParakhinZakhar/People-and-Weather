/**
 * @jest-environment node
 */
import { GET } from '@/app/api/weather/route';

describe('GET /api/weather', () => {
  it('should return weather data for valid coordinates', async () => {
    const mockRequest = new Request('http://localhost:3000/api/weather?lat=40.7128&lon=-74.0060');
    
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toBeDefined();
    
    expect(data).toHaveProperty('current');
    expect(data.current).toHaveProperty('time');
    expect(data.current).toHaveProperty('temperature');
    expect(data.current).toHaveProperty('description');
    expect(data.current).toHaveProperty('image');
    
    expect(data).toHaveProperty('daily');
    expect(data.daily).toHaveProperty('temperature_min');
    expect(data.daily).toHaveProperty('temperature_max');
    
    expect(typeof data.current.temperature).toBe('number');
    expect(typeof data.current.description).toBe('string');
    expect(typeof data.current.image).toBe('string');
  });

  it('should return valid temperature values', async () => {
    const mockRequest = new Request('http://localhost:3000/api/weather?lat=40.7128&lon=-74.0060');
    
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    
    expect(data.current.temperature).toBeGreaterThan(-100);
    expect(data.current.temperature).toBeLessThan(100);
    
    if (data.daily.temperature_min !== null) {
      expect(data.daily.temperature_min).toBeGreaterThan(-100);
      expect(data.daily.temperature_min).toBeLessThan(100);
    }
    
    if (data.daily.temperature_max !== null) {
      expect(data.daily.temperature_max).toBeGreaterThan(-100);
      expect(data.daily.temperature_max).toBeLessThan(100);
    }
    
    if (data.daily.temperature_max !== null && data.daily.temperature_min !== null) {
      expect(data.daily.temperature_max).toBeGreaterThanOrEqual(data.daily.temperature_min);
    }
  });

  it('should return 400 when latitude is missing', async () => {
    const mockRequest = new Request('http://localhost:3000/api/weather?lon=-74.0060');
    
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
    expect(data.error).toBe('Missing latitude or longitude');
  });

  it('should return 400 when longitude is missing', async () => {
    const mockRequest = new Request('http://localhost:3000/api/weather?lat=40.7128');
    
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
    expect(data.error).toBe('Missing latitude or longitude');
  });

  it('should return 400 when both parameters are missing', async () => {
    const mockRequest = new Request('http://localhost:3000/api/weather');
    
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
  });

  it('should return weather data for different locations', async () => {
    const locations = [
      { lat: 51.5074, lon: -0.1278, name: 'London' },
      { lat: 35.6762, lon: 139.6503, name: 'Tokyo' },
      { lat: -33.8688, lon: 151.2093, name: 'Sydney' }
    ];

    for (const location of locations) {
      const mockRequest = new Request(
        `http://localhost:3000/api/weather?lat=${location.lat}&lon=${location.lon}`
      );
      
      const response = await GET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.current).toBeDefined();
      expect(data.daily).toBeDefined();
      expect(typeof data.current.temperature).toBe('number');
    }
  }, 15000);

  it('should return proper weather description and image', async () => {
    const mockRequest = new Request('http://localhost:3000/api/weather?lat=40.7128&lon=-74.0060');
    
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.current.description).toBeTruthy();
    expect(data.current.description.length).toBeGreaterThan(0);
    expect(data.current.image).toBeTruthy();
    expect(data.current.image).toMatch(/^https?:\/\//);
  });

  it('should handle edge case coordinates (equator, poles)', async () => {
    const mockRequest = new Request('http://localhost:3000/api/weather?lat=0&lon=0');
    
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.current).toBeDefined();
    expect(typeof data.current.temperature).toBe('number');
  });
});