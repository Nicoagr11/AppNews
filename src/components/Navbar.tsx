import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type Props = {
  onCreate?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const Navbar: React.FC<Props> = ({ onCreate, onEdit, onDelete }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const whiteButtonStyles = {
    backgroundColor: '#FFFFFF',
    color: '#B71C1C', // Rojo oscuro para el texto (puede ser #B71C1C o un tono más claro)
    textTransform: 'none',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    marginLeft: '0.5rem',
  };


  const isHome = location.pathname === '/';
  const isDetail = location.pathname.includes('/news/');

  return (
    <AppBar position="static" sx={{backgroundColor: "#B71C1C"}}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          MFNews
        </Typography>

        {isHome && onCreate && (
          <Button sx={whiteButtonStyles} color="inherit" onClick={onCreate}>
            Crear Noticia
          </Button>
        )}

        {isDetail && (
          <>
            <Button sx={whiteButtonStyles} color="inherit" onClick={() => navigate('/')}>
              Volver
            </Button>
            {onEdit && <Button sx={whiteButtonStyles} color="inherit" onClick={onEdit}>Editar</Button>}
            {onDelete && <Button sx={whiteButtonStyles} color="inherit" onClick={onDelete}>Eliminar</Button>}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
