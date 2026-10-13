export const IMAGES = {
  services: {
    montage: 'https://images.pexels.com/photos/5217124/pexels-photo-5217124.jpeg?auto=compress&cs=tinysrgb&w=1200',
    trockenbau: 'https://images.pexels.com/photos/11427055/pexels-photo-11427055.jpeg?auto=compress&cs=tinysrgb&w=1200',
    boden: 'https://images.pexels.com/photos/4263067/pexels-photo-4263067.jpeg?auto=compress&cs=tinysrgb&w=1200',
    hausmeister: 'https://images.pexels.com/photos/17063686/pexels-photo-17063686.jpeg?auto=compress&cs=tinysrgb&w=1200',
    umzug: 'https://images.pexels.com/photos/5933476/pexels-photo-5933476.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  gallery: [
    'https://images.pexels.com/photos/36035073/pexels-photo-36035073.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/36035072/pexels-photo-36035072.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/5691495/pexels-photo-5691495.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/4756489/pexels-photo-4756489.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/5691550/pexels-photo-5691550.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/14541104/pexels-photo-14541104.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6474133/pexels-photo-6474133.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  team: [
    'https://images.pexels.com/photos/37556452/pexels-photo-37556452.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/901941/pexels-photo-901941.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/37556455/pexels-photo-37556455.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/37556458/pexels-photo-37556458.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  beforeAfter: {
    before: 'https://images.pexels.com/photos/5691510/pexels-photo-5691510.jpeg?auto=compress&cs=tinysrgb&w=1400',
    after: 'https://images.pexels.com/photos/368754/pexels-photo-368754.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
  heroPoster: 'https://images.pexels.com/photos/4312855/pexels-photo-4312855.jpeg?auto=compress&cs=tinysrgb&w=1920',
};

export const SERVICE_KEYS = ['montage', 'trockenbau', 'boden', 'hausmeister', 'umzug'] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const COMPANY = {
  phone: '+49 511 1234567',
  phoneHref: 'tel:+495111234567',
  email: 'info@bautech.de',
  emailHref: 'mailto:info@bautech.de',
  whatsapp: 'https://wa.me/495111234567',
  address: 'Hannover, Deutschland',
};
