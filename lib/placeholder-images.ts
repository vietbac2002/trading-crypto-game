
const data = {
  "placeholderImages": [
    {
      "id": "hero-background",
      "description": "A futuristic cityscape at night with neon lights.",
      "imageUrl": "https://images.unsplash.com/photo-1573767291321-c0af2eaf5266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxmdXR1cmlzdGljJTIwY2l0eXxlbnwwfHx8fDE3NjM3NzgwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "futuristic city"
    }
  ]
}

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
