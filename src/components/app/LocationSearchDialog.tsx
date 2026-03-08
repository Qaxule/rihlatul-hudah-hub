import { useState, useCallback } from 'react';
import { Pencil } from 'lucide-react';
import { MapPin, Search, Loader2, Navigation } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LocationResult {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  display: string;
}

interface LocationSearchDialogProps {
  currentCity?: string;
  currentCountry?: string;
  onLocationSelect: (city: string, country: string, lat: number, lon: number) => void;
}

export const LocationSearchDialog = ({ currentCity, currentCountry, onLocationSelect }: LocationSearchDialogProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const searchLocation = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    setError('');
    try {
      const encoded = encodeURIComponent(searchQuery.trim());
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=5&addressdetails=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await response.json();

      if (data.length === 0) {
        setError('No results found. Try a different city name.');
        setResults([]);
        return;
      }

      const locations: LocationResult[] = data.map((item: any) => {
        const city = item.address?.city || item.address?.town || item.address?.village || item.address?.state || item.name;
        const country = item.address?.country || '';
        return {
          city,
          country,
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon),
          display: `${city}${country ? `, ${country}` : ''}`,
        };
      });

      setResults(locations);
    } catch {
      setError('Failed to search. Please try again.');
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSelect = (result: LocationResult) => {
    onLocationSelect(result.city, result.country, result.latitude, result.longitude);
    setOpen(false);
    setQuery('');
    setResults([]);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsSearching(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const city = data.city || data.locality || 'Unknown';
            const country = data.countryName || '';
            onLocationSelect(city, country, latitude, longitude);
            setOpen(false);
          } catch {
            setError('Failed to get location name.');
          } finally {
            setIsSearching(false);
          }
        },
        () => {
          setError('Location access denied.');
          setIsSearching(false);
        }
      );
    }
  };

  // Debounced search on Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchLocation(query);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground mt-2 hover:text-primary transition-colors">
          <MapPin className="w-3.5 h-3.5" />
          <span>{currentCity ? `${currentCity}${currentCountry ? `, ${currentCountry}` : ''}` : 'Set location'}</span>
          <Pencil className="w-3 h-3 opacity-60" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Your Location</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-9"
                maxLength={100}
                autoFocus
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => searchLocation(query)}
              disabled={isSearching || query.trim().length < 2}
            >
              {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </Button>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start text-sm text-muted-foreground"
            onClick={handleUseCurrentLocation}
            disabled={isSearching}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Use current location
          </Button>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          {results.length > 0 && (
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {results.map((result, i) => (
                <button
                  key={i}
                  className="w-full text-left px-3 py-3 rounded-lg hover:bg-accent transition-colors flex items-center gap-3"
                  onClick={() => handleSelect(result)}
                >
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground">{result.display}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
