import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

type MPItem = {
  id?: string;
  title: string;
  description?: string;
  picture_url?: string;
  category_id?: string;
  quantity: number;
  currency_id: string;
  unit_price: number;
};

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  const item: MPItem = {
    id: String(body?.id ?? "SKU-1"),
    title: String(body?.title ?? "Produto"),
    description: body?.description ? String(body.description) : undefined,
    picture_url: body?.picture_url ? String(body.picture_url) : undefined,
    category_id: String(body?.category_id ?? "others"),
    quantity: Number(body?.quantity ?? 1),
    unit_price: Number(body?.unit_price ?? 0),
    currency_id: String(body?.currency_id ?? "BRL"),
  };

  if (!Number.isFinite(item.quantity) || !Number.isFinite(item.unit_price)) {
    return NextResponse.json(
      { error: "quantity e unit_price devem ser números" },
      { status: 400 }
    );
  }

  const accessToken =
    process.env.MP_ACCESS_TOKEN ?? process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json(
      { error: "Token do Mercado Pago ausente (MP_ACCESS_TOKEN)" },
      { status: 500 }
    );
  }

  const client = new MercadoPagoConfig({ accessToken });
  const pref = new Preference(client);

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  // Cast para contornar diferenças de tipos entre versões do SDK
  const created = await pref.create({
    body: {
      items: [item] as unknown as any[],
      back_urls: {
        success: `${base}/loja/sucesso`,
        failure: `${base}/loja/erro`,
        pending: `${base}/loja/pendente`,
      },
      auto_return: "approved",
    },
  });

  return NextResponse.json(created);
}
