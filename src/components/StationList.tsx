import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Radio, MapPin, Music, ChevronDown, Globe2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioStation, getCountries, searchStations } from '@/data/radioStations';

interface StationListProps {
  stations: RadioStation[];
  currentStation: RadioStation | null;
  isPlaying: boolean;
  onStationSelect: (station: RadioStation) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const StationList = ({
  stations,
  currentStation,
  isPlaying,
  onStationSelect,
  isOpen,
  onClose,
}: StationListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const countries = useMemo(() => getCountries(stations), [stations]);

  const filteredStations = useMemo(() => {
    // Require a search or country filter before showing results (too many stations otherwise)
    if (!searchQuery && !selectedCountry) return [];

    let result = stations;
    if (searchQuery) {
      result = searchStations(stations, searchQuery);
    }
    if (selectedCountry) {
      result = result.filter(s => s.country === selectedCountry);
    }
    return result.slice(0, 200);
  }, [stations, searchQuery, selectedCountry]);

  const groupedStations = useMemo(() => {
    const groups: Record<string, RadioStation[]> = {};
    filteredStations.forEach(station => {
      if (!groups[station.country]) {
        groups[station.country] = [];
      }
      groups[station.country].push(station);
    });
    return groups;
  }, [filteredStations]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-full max-w-md z-50 glass-strong border-r border-border/50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">
                      Stations{' '}
                      <span className="text-sm text-muted-foreground font-normal">
                        ({stations.length.toLocaleString()})
                      </span>
                    </h2>
                  </div>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Search */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search stations, cities, genres…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10 bg-muted/50 border-border/50"
                  />
                </div>

                {/* Country Filter */}
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="w-full justify-between bg-muted/50 border-border/50"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {selectedCountry || 'All Countries'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`}
                    />
                  </Button>

                  <AnimatePresence>
                    {showCountryDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-1 glass-strong rounded-lg border border-border/50 max-h-48 overflow-auto z-10"
                      >
                        <button
                          onClick={() => {
                            setSelectedCountry(null);
                            setShowCountryDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-primary/10 transition-colors"
                        >
                          All Countries
                        </button>
                        {countries.map(country => (
                          <button
                            key={country}
                            onClick={() => {
                              setSelectedCountry(country);
                              setShowCountryDropdown(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-primary/10 transition-colors"
                          >
                            {country}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Stations List */}
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-6">
                  {/* Prompt when no filter active */}
                  {!searchQuery && !selectedCountry && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Search for stations, cities, or countries</p>
                      <p className="text-xs mt-1">
                        {stations.length.toLocaleString()} stations available
                      </p>
                    </div>
                  )}

                  {Object.entries(groupedStations).map(([country, countryStations]) => (
                    <div key={country}>
                      <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {country} ({countryStations.length})
                      </h3>
                      <div className="space-y-1">
                        {countryStations.map(station => {
                          const isActive = currentStation?.id === station.id;
                          return (
                            <motion.button
                              key={station.id}
                              onClick={() => onStationSelect(station)}
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full p-3 rounded-lg text-left transition-all ${
                                isActive
                                  ? isPlaying
                                    ? 'bg-accent/20 border border-accent/50'
                                    : 'bg-primary/20 border border-primary/50'
                                  : 'hover:bg-muted/50 border border-transparent'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                    isActive && isPlaying
                                      ? 'bg-accent/30'
                                      : isActive
                                        ? 'bg-primary/30'
                                        : 'bg-muted'
                                  }`}
                                >
                                  <Radio
                                    className={`w-4 h-4 ${
                                      isActive && isPlaying
                                        ? 'text-accent'
                                        : isActive
                                          ? 'text-primary'
                                          : 'text-muted-foreground'
                                    }`}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`font-medium truncate ${
                                        isActive ? 'text-foreground' : 'text-foreground/80'
                                      }`}
                                    >
                                      {station.name}
                                    </span>
                                    {isActive && isPlaying && (
                                      <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground truncate">
                                    {station.city}
                                  </div>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Music className="w-3 h-3 text-muted-foreground/70" />
                                    <span className="text-xs text-muted-foreground/70">
                                      {station.genre}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {(searchQuery || selectedCountry) && filteredStations.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Radio className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No stations found</p>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Stats Footer */}
              <div className="p-4 border-t border-border/50">
                <div className="text-xs text-muted-foreground text-center">
                  Showing {filteredStations.length} of {stations.length.toLocaleString()} stations
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
