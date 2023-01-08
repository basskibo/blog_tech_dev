export default function handler (req, res) {
  const name = req.query.name ? req.query.name : 'John Doe'
  res.status(200).json({ name })
}
