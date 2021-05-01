export default (req, res) => {
  res.statusCode = 200
  res.json({ msg: 'hello world!' })
}
