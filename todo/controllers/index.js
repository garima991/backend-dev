exports.notFound = (req, res) => {
    res.status(404).send({ message: 'Invalid API URL or Route not found' });
}