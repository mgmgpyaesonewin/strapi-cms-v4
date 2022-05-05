module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'wave-strapi-staging-postgres.cu9u29llxirv.ap-southeast-1.rds.amazonaws.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'WaveStrapiStaging'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
