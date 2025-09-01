import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, source } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    let zoho = null;
    const token = process.env.ZOHO_BIGIN_ACCESS_TOKEN;
    if (token) {
      const base = process.env.ZOHO_API_BASE || "https://www.zohoapis.com";
      // Bigin requer "data: [ {...} ]" e tipicamente Last_Name é obrigatório
      const payload = {
        data: [
          {
            Last_Name: name || "Lead",
            Email: email,
            Lead_Source: source || "Website",
          },
        ],
        trigger: ["workflow"] // dispara automações, se houver
      };

      const resp = await fetch(`${base}/bigin/v2/Contacts`, {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();
      zoho = { status: resp.status, data };
    }

    return NextResponse.json({ ok: true, routed: Boolean(token), zoho });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "unexpected" }, { status: 500 });
  }
}
