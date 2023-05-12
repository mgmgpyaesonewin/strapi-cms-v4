module.exports = ({ env }) => ({
  app: {
    "merchant": {
      client_id:env('MERCHANT_CLIENT_ID', 'key'),
      client_secret: env('MERCHANT_CLIENT_SECRET', 'value'),
      secret_key:env('MERCHANT_SECRET_KEY', 'f6298a18c678e5e683f407169c59e721ff6bd33b1995d74e78039f4fca0b8044'),
    },
    "wp": {
      client_id:env('WP_CLIENT_ID', 'key'),
      client_secret: env('WP_CLIENT_SECRET', 'value'),
      secret_key:env('WP_SECRET_KEY', 'f6298a18c678e5e683f407169c59e721ff6bd33b1995d74e78039f4fca0b8044'),
    },
    "wc": {
      client_id:env('WC_CLIENT_ID', 'key'),
      client_secret: env('WC_CLIENT_SECRET', 'value'),
      secret_key:env('WC_SECRET_KEY', 'f6298a18c678e5e683f407169c59e721ff6bd33b1995d74e78039f4fca0b8044'),
    },
  },
});