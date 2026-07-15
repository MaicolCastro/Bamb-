export const SITE = {
  name: "Bambú",
  fullName: "Agencia de Viajes Bambú",
  tagline: "Tu próxima aventura comienza con Bambú",
  description:
    "Agencia de viajes en Armenia, Quindío. Creamos experiencias inolvidables en Colombia y el mundo con asesoría personalizada.",
  url: "https://bambuviajes.com",
  locale: "es_CO",
  city: "Armenia",
  region: "Quindío",
  country: "Colombia",
  address: "Armenia, Quindío, Colombia",
  email: "turismo@bambuagenciadeviajes.com",
  phone: "+57 310 5386479",
  phoneDisplay: "+57 310 5386479",
  whatsapp: "573147507642",
  whatsappDisplay: "+57 314 7507642",
  whatsappMessage:
    "Hola Bambú, me gustaría cotizar un viaje. ¿Me pueden asesorar?",
  mapsUrl: "https://maps.app.goo.gl/beyJxuo2zGXGN4Mh6",
  social: {
    instagram: "https://www.instagram.com/bambu_agencia?igsh=MXVvbXgxemRjY2oxYg==",
    facebook: "https://www.facebook.com/share/18Ks7aEtyf/",
    tiktok: "https://tiktok.com/@bambuviajes",
  },
  mapEmbed:
    "https://maps.google.com/maps?q=Armenia,+Quind%C3%ADo,+Colombia&hl=es&z=14&output=embed",
} as const;

export const HERO_MEDIA = {
  video:
    "https://videos.pexels.com/video-files/3575514/3575514-hd_1920_1080_25fps.mp4",
  poster:
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=85",
} as const;

export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "¿Por qué Bambú?", href: "#por-que-bambu" },
  { label: "Destinos", href: "#destinos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const WHY_CHOOSE_US = [
  {
    icon: "HeartHandshake" as const,
    title: "Atención personalizada",
    description:
      "Cada viajero es único. Escuchamos tus sueños, preferencias y presupuesto para diseñar una experiencia hecha a tu medida, sin fórmulas genéricas.",
  },
  {
    icon: "Map" as const,
    title: "Planes a tu medida",
    description:
      "Desde escapadas románticas hasta viajes corporativos, diseñamos itinerarios flexibles y personalizados según las necesidades, preferencias y estilo de cada viajero.",
  },
  {
    icon: "ShieldCheck" as const,
    title: "Acompañamiento total",
    description:
      "Antes, durante y después del viaje. Estamos a un mensaje de distancia para que viajes con total tranquilidad.",
  },
  {
    icon: "Award" as const,
    title: "Experiencia y confianza",
    description:
      "Más de una década conectando viajeros colombianos con los mejores destinos. Tu tranquilidad es nuestra prioridad.",
  },
] as const;

export const DESTINATIONS = [
  {
    name: "Cartagena",
    country: "Colombia",
    tagline: "Historia, mar y magia caribeña",
    image: "/images/destinations/cartagena.png",
    span: "wide" as const,
  },
  {
    name: "San Andrés",
    country: "Colombia",
    tagline: "El mar de siete colores te espera",
    image: "/images/destinations/san-andres.png",
    span: "normal" as const,
  },
  {
    name: "Eje Cafetero",
    country: "Colombia",
    tagline: "Paisajes que enamoran desde casa",
    image: "/images/destinations/eje-cafetero.png",
    span: "tall" as const,
  },
  {
    name: "Cancún",
    country: "México",
    tagline: "Sol, arena y experiencias inolvidables",
    image: "/images/destinations/cancun.png",
    span: "wide" as const,
  },
  {
    name: "Punta Cana",
    country: "República Dominicana",
    tagline: "Paraíso tropical sin complicaciones",
    image: "/images/destinations/punta-cana.png",
    span: "normal" as const,
  },
  {
    name: "Europa",
    country: "Internacional",
    tagline: "Cultura, gastronomía y aventura",
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80",
    span: "tall" as const,
  },
  {
    name: "Medellín",
    country: "Colombia",
    tagline: "La ciudad de la eterna primavera",
    image: "/images/destinations/medellin.png",
    span: "normal" as const,
  },
  {
    name: "Orlando",
    country: "Estados Unidos",
    tagline: "Magia, parques y diversión en familia",
    image: "/images/destinations/orlando.png",
    span: "normal" as const,
  },
  {
    name: "Perú",
    country: "Internacional",
    tagline: "Historia inca y paisajes imponentes",
    image: "/images/destinations/peru.png",
    span: "normal" as const,
  },
  {
    name: "Río de Janeiro",
    country: "Brasil",
    tagline: "Samba, playas icónicas y energía única",
    image: "/images/destinations/rio-de-janeiro.png",
    span: "normal" as const,
  },
  {
    name: "Miami",
    country: "Estados Unidos",
    tagline: "Estilo, playas y vida cosmopolita",
    image: "/images/destinations/miami.png",
    span: "normal" as const,
  },
  {
    name: "Panamá",
    country: "Internacional",
    tagline: "Canal, modernidad y naturaleza",
    image: "/images/destinations/panama.png",
    span: "normal" as const,
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Cuéntanos tu idea",
    description:
      "Comparte con nosotros a dónde quieres ir, con quién viajas y qué experiencias sueñas vivir. Sin compromiso, solo conversación.",
  },
  {
    step: 2,
    title: "Diseñamos el viaje",
    description:
      "Nuestro equipo crea propuestas personalizadas con las mejores opciones de vuelos, hoteles y actividades según tu estilo.",
  },
  {
    step: 3,
    title: "Organizamos todo",
    description:
      "Nos encargamos de reservas, documentación, seguros y cada detalle logístico para que tú solo te preocupes por hacer la maleta.",
  },
  {
    step: 4,
    title: "Disfruta sin preocupaciones",
    description:
      "Viaja sabiendo que tienes un equipo de confianza respaldándote. Tu aventura comienza, nosotros seguimos contigo.",
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    name: "María Fernanda López",
    location: "Armenia, Quindío",
    trip: "San Andrés en familia",
    text: "Bambú organizó nuestro viaje familiar completo. Desde el primer contacto sentimos confianza. Todo salió perfecto y los niños aún hablan del mar de siete colores.",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Andrés Mejía",
    location: "Pereira, Risaralda",
    trip: "Europa en pareja",
    text: "Queríamos una luna de miel especial y Bambú superó expectativas. Itinerario impecable, hoteles increíbles y asesoría en cada paso. 100% recomendados.",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
  },
  {
    id: 3,
    name: "Laura Patricia Gómez",
    location: "Manizales, Caldas",
    trip: "Cartagena con amigas",
    text: "La atención personalizada hace la diferencia. Nos ayudaron a encontrar opciones dentro de nuestro presupuesto sin sacrificar calidad. ¡Ya estamos planeando el próximo!",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
  },
  {
    id: 4,
    name: "Empresa Cafés del Eje",
    location: "Armenia, Quindío",
    trip: "Viaje corporativo Cancún",
    text: "Confiamos en Bambú para el retiro de nuestra empresa. Coordinación impecable para 25 personas. Profesionales, puntuales y siempre disponibles.",
    avatar: "https://i.pravatar.cc/150?img=68",
    rating: 5,
  },
] as const;

export const GOOGLE_REVIEWS = {
  rating: 4.9,
  count: 47,
} as const;

export const STATS = [
  { value: 1500, suffix: "+", label: "Viajeros felices" },
  { value: 10, suffix: "+", label: "Años de experiencia" },
  { value: 300, suffix: "+", label: "Destinos disponibles" },
  { value: 98, suffix: "%", label: "Satisfacción" },
] as const;

export const GALLERY_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    alt: "Montañas al amanecer",
    span: "tall" as const,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
    alt: "Lago turquesa en la naturaleza",
    span: "wide" as const,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    alt: "Playa paradisíaca",
    span: "normal" as const,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    alt: "Carretera de aventura",
    span: "normal" as const,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
    alt: "Templos en Asia",
    span: "tall" as const,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    alt: "Atardecer en la ciudad",
    span: "wide" as const,
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    alt: "Picos nevados",
    span: "normal" as const,
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    alt: "Paisaje natural al amanecer",
    span: "normal" as const,
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
    alt: "Dunas al atardecer",
    span: "normal" as const,
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    alt: "Montañas bajo el cielo nocturno",
    span: "normal" as const,
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    alt: "Aurora boreal en el cielo ártico",
    span: "normal" as const,
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
    alt: "Canales y arquitectura en Venecia",
    span: "normal" as const,
  },
] as const;

export const DESTINATION_OPTIONS = [
  "Colombia — Cartagena",
  "Colombia — San Andrés",
  "Colombia — Eje Cafetero",
  "Colombia — Medellín",
  "México — Cancún",
  "República Dominicana — Punta Cana",
  "Brasil — Río de Janeiro",
  "Perú",
  "Europa",
  "Estados Unidos — Orlando",
  "Estados Unidos — Miami",
  "Panamá",
  "Otro destino",
] as const;
