const express = require('express');
const { layoutProcess } = require('bpmn-auto-layout');
const app = express();

app.use(express.json());

app.post('/layout', async (req, res) => {
  try {
    const { bpmnXml } = req.body;
    if (!bpmnXml) return res.status(400).send('BPMN XML is required');
    const layoutedXml = await layoutProcess(bpmnXml);
    res.send({ layoutedXml });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
