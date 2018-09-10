module.exports = `
doctype html
html
  head
    meta(charset="utf-8")
    meta(name='viewpoint',content='width=device-width, initial-scal=1')
    title Pugjs 尝试
    link(href='https://cdn.bootcss.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css' rel='stylesheet')
    script(src='https://cdn.bootcss.com/bootstrap/4.0.0-beta.2/js/bootstrap.bundle.min.js')
    script(src='https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js')
  body
    .container
      .row
        .col-md-8
          h1 #{data.first}
          p #{data.second}
        .col-md-4
          p Pugjs 尝试
`
