function progressBar(width = 500, height = 25, percentage = 62, fontSize = 12, BGC = '#E2E2B6', FGC = '#03346E', fontColor = '#FFFFFF') {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.id = 'canvas'
    const ctx = canvas.getContext('2d')

    const x = 0
    const y = 0
    const radius = height / 2


    function drawRoundedRech(x, y, width, height, radius, percentage) {
        ctx.beginPath()
        ctx.moveTo(x + radius, y)
        ctx.lineTo(x + width * percentage - radius, y)
        ctx.arc(x + width * percentage - radius, y + radius, radius, Math.PI * 3 / 2, Math.PI / 2)
        ctx.lineTo(x + radius, y + height)
        ctx.arc(x + radius, y + radius, radius, Math.PI / 2, Math.PI * 3 / 2)
    }

    // Background
    ctx.fillStyle = BGC
    drawRoundedRech(x, y, width, height, radius, 1)
    ctx.fill()

    // Percentage
    ctx.fillStyle = FGC
    drawRoundedRech(x, y, width, height, radius, percentage / 100)
    ctx.fill()

    const textWidth = ctx.measureText(`${percentage}%`).width
    ctx.font = `${fontSize}px Arial`
    ctx.fillStyle = fontColor
    ctx.textBaseline = 'top'
    ctx.fillText(`${percentage}%`, x + width / 2 - textWidth, y + radius - fontSize / 2)

    document.body.appendChild(canvas)

    const downloadBtn = document.createElement('a')
    downloadBtn.innerText = 'Download'
    downloadBtn.href = canvas.toDataURL('image/png')
    downloadBtn.download = 'progressBar'
    downloadBtn.id = 'downloadBtn'
    document.body.appendChild(downloadBtn)
}

// progressBar()

btn = document.getElementById('submit')
btn.addEventListener('click', () => {
    try {
        document.getElementById('canvas').remove()
        document.getElementById('downloadBtn').remove()
    } catch {
        // First Time
    }

    const width = parseInt(document.getElementById('width').value)
    const height = parseInt(document.getElementById('height').value)
    const percentage = parseInt(document.getElementById('percentage').value)
    const fontSize = parseInt(document.getElementById('fontSize').value)
    const BGC = document.getElementById('BGC').value
    const FGC = document.getElementById('FGC').value
    const FC = document.getElementById('FC').value

    progressBar(width, height, percentage, fontSize, BGC, FGC, FC)
})