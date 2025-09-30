import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';

function validaCPF(cpf) {
    if (cpf === undefined || cpf === null) return false;
  
    // Normaliza: mantém apenas dígitos
    const str = String(cpf).replace(/\D/g, '');
  
    // Deve ter 11 dígitos
    if (str.length !== 11) return false;
  
    // Rejeita CPFs compostos por todos os mesmos dígitos (ex: "00000000000")
    if (/^(\d)\1{10}$/.test(str)) return false;
  
    const calcDigito = (base, pesoInicial) => {
      // base: array de dígitos (como números)
      // pesoInicial: peso do primeiro dígito (10 para o 1º dígito verificador, 11 para o 2º)
      let soma = 0;
      for (let i = 0; i < base.length; i++) {
        soma += base[i] * (pesoInicial - i);
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };
  
    // converte em array de números
    const digits = str.split('').map(d => parseInt(d, 10));
  
    // Primeiro dígito verificador (usar os 9 primeiros dígitos, pesos 10..2)
    const d1 = calcDigito(digits.slice(0, 9), 10);
    if (d1 !== digits[9]) return false;
  
    // Segundo dígito verificador (usar os 9 primeiros + d1, pesos 11..2)
    const d2 = calcDigito(digits.slice(0, 9).concat(d1), 11);
    if (d2 !== digits[10]) return false;
  
    return true;
  }

//asincrona nome_da_função(recebendo, responder, proximo)
export const UserController = {
    
    async login(req, res, next) {
        try {
          const { email, senha } = req.body;

          let u = await prisma.user.findFirst({
            where: {email: email}
          })

          if(!u) return res.status(404).json({error: "Não tem um usuario com esse email"});
    
          const ok = await bcrypt.compare(senha, u.pass);
          if (!ok) return res.status(401).json({ erro: "Credenciais inválidas" });

          // Gera JWT (payload mínimo)
          const token = jwt.sign(
            { sub: u.id, email: u.email, name: u.name },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
          );
    
          return res.json({ token });
        } catch (e) { 
            next(e); 
        }
    },

    //C - CREATE, INSERT, POST, SET, STORE
    async store(req, res, next){
        try{
            const { name, cpf, email, pass, phone, signature } = req.body;

            if(!validaCPF(cpf)){
                res.status(401).json({'erro':'CPF invalido'})
            }

            const hash = await bcrypt.hash(pass, 10);

            const u = await prisma.user.create({
                data: { 
                    name, 
                    cpf, 
                    email, 
                    pass: hash, 
                    phone, 
                    signature
                }
            });

            //respondendo 201-criado encapsulando_no_formato_json(u)
            res.status(201).json(u);
        }catch(err){
            next(err);
        }
    },

    //R - READ, SELECT, GET, findMany
    async index(req, res, _next){
        let query = {}

        if (req.query.name) query.name = {contains: req.query.name}
        if (req.query.email) query.email = req.query.email
        if (req.query.cpf) query.cpf = req.query.cpf

        const users = await prisma.user.findMany({
            where: query
        });

        res.status(200).json(users)
    },

    // R - READ, SELECT, GET
    async show(req, res, _next) {
        try {
            const id = Number(req.params.id);

            const u = await prisma.user.findUniqueOrThrow({
                where: { id }
            });

            res.status(200).json(u);
        } catch (err) {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
    },


    // U - UPDATE, PUT, PATCH
    async put(req, res, next){
        try{
            const id = Number(req.params.id);

            let batatinha = {};

            //nome vindo do body na requisição não é indefinido
            if(req.body.name) batatinha.name = req.body.name;
            if(req.body.cpf) batatinha.cpf = req.body.cpf;
            if(req.body.email) batatinha.email = req.body.email;
            if(req.body.phone) batatinha.phone = req.body.phone; 
            if(req.body.signature) batatinha.signature = req.body.signature;

            const u = prisma.user.update({
                where: {id},
                data: batatinha
            });

            res.status(200).json(u)
        }catch(err){
            next(err);
        }
    },

    // D - DELETE, DROP, REMOVE, DEL
    async del(req, res, _next){
        try {
            const id = Number(req.params.id);

            const u = await prisma.user.delete({
                where: { id }
            });

            res.status(200).json(u);
        } catch (err) {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
    },
    
}








