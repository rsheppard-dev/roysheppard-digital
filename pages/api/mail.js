const mail = require('@sendgrid/mail')

mail.setApiKey(process.env.SENDGRIP_API_KEY)

export default async (req, res) => {
  const {formData, token} = JSON.parse(req.body)

  console.log(formData, token)

  const human = await validateHuman(token)

  if (!human) {
    res.status(400).json({
      errors: ['Please, you are not fooling us, bot.']
    })
    return
  }

  const validateHuman = async (token) => {
    const secret = process.key.RECAPTCHA_SECRET_KEY

    const response = await fetch(`https://www.google.com/recapture/api/siteverify?secret=${secret}&response=${token}`, {
      method: 'POST'
    })

    const data = await response.json()

    return data.success
  }

  const message = `
  Name: ${formData.name}\r\n
  Email: ${formData.email}\r\n
  Phone: ${formData.phone}\r\n
  Message: ${formData.message}
`

  const data = {
    to: 'info@roysheppard.digital',
    from: formData.email,
    subject: 'Customer Enquiry',
    text: message,
    html: message.replace(/\r\n/g, '<br>')
  }

  try {
    await mail.send(data)

    res.status(201).json({ status: 'ok' })
  } catch (error) {
    console.log(error)
  }
}
