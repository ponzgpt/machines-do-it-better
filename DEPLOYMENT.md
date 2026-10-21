# Deployment

**Production:** https://mdib.technoir.cloud: Hostinger VPS (`ssh hoid`), Swarm service `mdib-site` on `dokploy-network`, Traefik route `/etc/dokploy/traefik/dynamic/mdib-site.yml`, Let's Encrypt. `*.technoir.cloud` is wildcard DNS, so no record is needed. The Dockerfile runs `npm run check`, builds Astro and serves `dist/` with `nginx:1.27-alpine`, which answers `/healthz` for the Swarm health check.

```bash
./scripts/deploy.sh                          # refuse dirty tree, check, build mdib-site:<sha> on the VPS, roll out, wait for /healthz
ssh hoid docker service rollback mdib-site   # undo
```

The deploy touches only the `mdib-site` service, its image and source trees under `/opt/mdib-site`, and its own Traefik file.
