import { Box, Typography, Container, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 'auto' }}>
      <Container maxWidth="md">

        <Typography>
          © Yang Lan {new Date().getFullYear()} | Code snippets under <Link
            href="https://opensource.org/licenses/MIT"
            target="_blank" rel="noopener noreferrer">
            MIT License
          </Link> | Articles under <Link
            href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
            target="_blank" rel="noopener noreferrer">
            CC BY-NC-ND 4.0 License
          </Link>
        </Typography>

      </Container>
    </Box>
  )
}
