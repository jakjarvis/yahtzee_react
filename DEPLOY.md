## Production hosting through Netlify

This app is hosted in production via Netlify:
https://app.netlify.com/teams/jakjarvis/overview

Netlify is linked to the Github repo such that push/merges to master will automatically deploy:
https://github.com/jakjarvis/yahtzee_react

Netlify runs an automated build which has been set to ignore CI warnings during build using the command
CI='' npm run build

The app is normally hosted at the custom url
https://yahtzee.jakjarvis.com/
which is configured in Google Domains:
https://domains.google.com/registrar/jakjarvis.com/dns
