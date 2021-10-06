const mail = require('@sendgrid/mail')

mail.setApiKey(process.env.NEXT_PUBLIC_SENDGRIP_API_KEY)

export default (req, res) => {
  const body = JSON.parse(req.body)
  
  const message = `
    Name: ${body.name}\r\n
    Name: ${body.email}\r\n
    Name: ${body.phone}\r\n
    Name: ${body.message}
  `

  const data = {
    to: 'info@roysheppard.digital',
    from: body.email,
    subject: 'Customer Enquiry',
    text: message,
    html: message.replace(/\r\n/g, '<br>')
  }

  mail.send(data)

  res.status(200).json({ status: 'OK' })
}
