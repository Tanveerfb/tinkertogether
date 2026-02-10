import { 
  Container, 
  Typography, 
  Card,
  CardMedia,
  CardContent,
  Box
} from '@mui/material';
import Link from 'next/link';
import { getAllCharacters } from '../lib/characters';

export default function CharactersPage() {
  const characters = getAllCharacters();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Characters
      </Typography>
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(6, 1fr)',
          },
          gap: 3,
        }}
      >
        {characters.map((character) => (
          <Link 
            key={character.id}
            href={`/characters/${character.id}`} 
            style={{ textDecoration: 'none' }}
          >
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
                cursor: 'pointer'
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '100%', // 1:1 Aspect Ratio
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="img"
                  image={character.image}
                  alt={character.name}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" component="h2" noWrap>
                  {character.name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </Container>
  );
}
