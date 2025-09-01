import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { title = "Produto 5ESTRELAS", quantity = 1, unit_price = 49.9, currency_id = "BRL" } = body || {};

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) return NextResponse.json({ error: "Missing MERCADOPAGO_ACCESS_TOKEN" }, { status: 500 });

    const client = new MercadoPagoConfig({ accessToken });
    const pref = new Preference(client);

    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const created = await pref.create({
      body: {
        items: [{ title, quantity, unit_price, currency_id }],
        back_urls: {
          success: `${base}/loja/sucesso`,
          failure: `${base}/loja/erro`,
          pending: `${base}/loja/pendente`,
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({ ok: true, preference: created });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "MP error" }, { status: 500 });
  }
}
