# InitSites

Site oficial da InitSites — um braço do ecossistema Infra&Wifi.

**Produção planejada:** https://initsites.help4nes.workers.dev

## Arquitetura

- Site estático em HTML/CSS/JS
- Build explícito para `./dist`
- Cloudflare Workers + Static Assets
- Worker independente: `initsites`
- Custom Domain independente: `initsites.infrawifi.com.br`
- Sem dependência de runtime do Worker `infrawifi`

## Desenvolvimento

```bash
pnpm install
pnpm run quality
pnpm run dev
```

## Deploy

```bash
pnpm run deploy
```

O `wrangler.jsonc` declara `initsites.infrawifi.com.br` como Custom Domain. O deploy precisa ser executado com uma conta Cloudflare que tenha acesso à zona `infrawifi.com.br`.

## Cloudflare Workers Builds

Configuração recomendada ao importar este repositório:

- Production branch: `main`
- Root directory: `/`
- Build command: `pnpm run build`
- Deploy command: `npx wrangler deploy`
- Preview deploy command: `npx wrangler versions upload`

## Identidade

- Petróleo: `#123F3F`
- Verde Interface: `#2F706B`
- Âmbar Start: `#F2A65A`
- Fundo: `#F8F7F3`
- Tipografia: Manrope + Inter

**Slogan:** Seu negócio online, sem complicação.
