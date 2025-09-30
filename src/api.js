import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import userRoutes from './routes/user.js';
import habitRoutes from './routes/habit.js';
import { verificaToken } from './middlewares/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/habits', verificaToken, habitRoutes);

// Middleware de erro simples
app.use((err, _req, res, _next) => {
    console.error(err);
    if (err.code === 'P2002'){
        return res.status(409).json({
            error: 'Registro duplicado (unique)' 
        });
    } 
    if (err.code === 'P2003'){
         return res.status(404).json({
            error: 'A chave estrangeira não pode ser excluida' 
        });
    } 
    if (err.code === 'P2025'){
         return res.status(404).json({
            error: 'Registro não encontrado' 
        });
    }
    res.status(500).json({ error: 'Erro interno' });
});
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  
  

