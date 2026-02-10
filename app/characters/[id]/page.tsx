import { notFound } from 'next/navigation';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Chip,
  Divider,
  Button
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { getCharacterById, getAllCharacterIds, formatCharacterName } from '../../lib/characters';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface CharacterPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const characterIds = getAllCharacterIds();
  return characterIds.map((id) => ({
    id: id,
  }));
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;
  const character = getCharacterById(id);

  if (!character) {
    notFound();
  }

  const characterName = formatCharacterName(id);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Link href="/characters" passHref legacyBehavior>
        <Button 
          component="a"
          startIcon={<ArrowBackIcon />} 
          sx={{ mb: 3 }}
        >
          Back to Characters
        </Button>
      </Link>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Character Image */}
          <Box
            sx={{
              width: { xs: '100%', md: '300px' },
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 3,
              }}
            >
              <Image
                src={`/media/images/characters/${id}.png`}
                alt={characterName}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </Box>
          </Box>

          {/* Character Details */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              {characterName}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              <Chip 
                label={`Weapon: ${character.weapon.charAt(0).toUpperCase() + character.weapon.slice(1)}`} 
                color="primary" 
                variant="outlined"
              />
              <Chip 
                label={`Rarity: ${character.rarity.charAt(0).toUpperCase() + character.rarity.slice(1)}`} 
                color="secondary" 
                variant="outlined"
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              {character.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Base Stats */}
            <Typography variant="h5" gutterBottom>
              Base Stats (Level 1)
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2, mt: 2 }}>
              {character.hp && character.hp[1] && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    HP
                  </Typography>
                  <Typography variant="h6">
                    {Math.round(character.hp[1])}
                  </Typography>
                </Box>
              )}
              {character.atk && character.atk[1] && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    ATK
                  </Typography>
                  <Typography variant="h6">
                    {Math.round(character.atk[1])}
                  </Typography>
                </Box>
              )}
              {character.def && character.def[1] && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    DEF
                  </Typography>
                  <Typography variant="h6">
                    {Math.round(character.def[1])}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Stat Growth */}
            {character.statGrow && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h5" gutterBottom>
                  Stat Growth
                </Typography>
                <Typography variant="body1">
                  {character.statGrow.replace(/([A-Z])/g, ' $1').trim().replace(/^./, (str: string) => str.toUpperCase())}
                </Typography>
              </>
            )}

            {/* Constellations */}
            {character.constellations && character.constellations.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h5" gutterBottom>
                  Constellations
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {character.constellations.map((constellation: any, index: number) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        C{index + 1}: {constellation.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        dangerouslySetInnerHTML={{ __html: constellation.description }}
                      />
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
