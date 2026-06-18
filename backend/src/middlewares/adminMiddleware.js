function adminMiddleware(req, res, next) {

  // 🔥 valida existência + permissão
  if (!req.user || !req.user.is_admin) {
    return res.status(403).json({
      errors: [{ message: 'Acesso negado' }]
    });
  }

  next();
}

export default adminMiddleware;