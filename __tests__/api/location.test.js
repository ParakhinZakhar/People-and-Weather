/**
 * @jest-environment node
 */
import { GET } from '@/app/api/location/route';

describe('GET /api/location', () => {
  it('should return location data for valid coordinates', async () => {
    const mockRequest = new Request('http://localhost:3000/api/location?lat=40.7128&lon=-74.0060');
    
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toBeDefined();
    expect(data).toHaveProperty('displayName');
    expect(data).toHaveProperty('country');
    expect(data).toHaveProperty('city');
    expect(data).toHaveProperty('state');
    expect(typeof data.displayName).toBe('string');
    expect(data.displayName.length).toBeGreaterThan(0);
  });

  it('should return 400 when latitude is missing', async () => {
    const mockRequest = new Request('http://localhost:3000/api/location?lon=-74.0060');
    
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
    expect(data.error).toBe('Missing latitude or longitude parameters');
  });

  it('should return 400 when longitude is missing', async () => {
    const mockRequest = new Request('http://localhost:3000/api/location?lat=40.7128');
    
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
    expect(data.error).toBe('Missing latitude or longitude parameters');
  });

  it('should return 400 when both parameters are missing', async () => {
    const mockRequest = new Request('http://localhost:3000/api/location');
    
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
  });

  it('should handle valid coordinates and return proper location structure', async () => {
    const mockRequest = new Request('http://localhost:3000/api/location?lat=51.5074&lon=-0.1278');
    
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.country).toBeDefined();
    expect(data.displayName).toContain(data.country);
    
    if (data.city || data.state) {
      expect(data.displayName).toMatch(/,/);
    }
  });

  it('should return location with at least country for remote coordinates', async () => {
    const mockRequest = new Request('http://localhost:3000/api/location?lat=0&lon=0');
    
    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('displayName');
  });
});