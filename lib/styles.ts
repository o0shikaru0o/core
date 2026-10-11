export type StyleCard = {
  id: string;
  name: string;
  tags: string[];
  image: string;
};

const card = (id: string, name: string, tags: string[]): StyleCard => ({
  id,
  name,
  tags,
  image: `/styles/${id}.jpg`,
});

export const STYLE_CARDS: StyleCard[] = [
  card("sculptural-gold", "Sculptural Gold", ["organic shapes", "chunky", "warm metal", "statement"]),
  card("delicate-layers", "Delicate Layers", ["fine chains", "layering", "dainty", "minimal"]),
  card("pearl-modern", "Modern Pearl", ["pearls", "asymmetric", "contemporary"]),
  card("vintage-estate", "Vintage Estate", ["antique cuts", "filigree", "heirloom", "ornate"]),
  card("minimal-silver", "Minimal Silver", ["clean lines", "cool metal", "geometric", "quiet"]),
  card("bold-color", "Bold Color", ["colored stones", "enamel", "playful", "saturated"]),
  card("art-deco", "Art Deco", ["geometric symmetry", "baguettes", "1920s glamour"]),
  card("boho-natural", "Boho Natural", ["raw stones", "hammered metal", "earthy", "textured"]),
  card("statement-hoops", "Statement Hoops", ["oversized hoops", "bold scale"]),
  card("celestial", "Celestial", ["stars", "moons", "whimsical", "fine"]),
  card("brutalist", "Brutalist", ["raw", "architectural", "heavy", "mixed metal"]),
  card("classic-diamond", "Classic Sparkle", ["solitaires", "tennis", "timeless", "refined"]),
];

export const styleById = (id: string) => STYLE_CARDS.find((s) => s.id === id);

export const MIN_SWIPES = 6;
