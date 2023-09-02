import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";

import {
  addMemberToCommunity,
  createCommunity,
  deleteCommunity,
  removeUserFromCommunity,
  updateCommunityInfo,
} from "@/database/actions/community.actions";
import { NextResponse } from "next/server";
import { IncomingHttpHeaders } from "http";

type EventType =
  | "organization.created"
  | "organizationInvitation.created"
  | "organizationMembership.created"
  | "organizationMembership.deleted"
  | "organization.updated"
  | "organization.deleted";

type Event = {
  data: Record<string, string | number | Record<string, string>[]>;
  object: "event";
  type: EventType;
};

export const POST = async (request: Request) => {
  const payload = await request.json();
  const header = headers();

  const heads = {
    "svix-id": header.get("svix-id"),
    "svix-timestamp": header.get("svix-timestamp"),
    "svix-signature": header.get("svix-signature"),
  };

  let e: Event | null = null;
  const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET || "");

  try {
    e = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  const eventType: EventType = e?.type!;

  if (eventType === "organization.created") {
    const { id, name, slug, logo_url, image_url, created_by } = e?.data ?? {};

    try {
      await createCommunity({
        id: (id as string) || "",
        name: (name as string) || "",
        username: (slug as string) || "",
        image: (logo_url as string) || (image_url as string) || "",
        bio: "organization bio",
        createdById: created_by as string,
      });

      return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  if (eventType === "organizationInvitation.created") {
    try {
      console.log("Invitation created", e?.data);

      return NextResponse.json(
        { message: "Invitation created" },
        { status: 201 }
      );
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  if (eventType === "organizationMembership.created") {
    try {
      const { organization, public_user_data } = e?.data;

      await addMemberToCommunity({
        // @ts-ignore
        communityId: organization?.id || "",
        // @ts-ignore
        memberId: public_user_data?.user_id || "",
      });

      return NextResponse.json(
        { message: "Invitation accepted" },
        { status: 201 }
      );
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  if (eventType === "organizationMembership.deleted") {
    try {
      const { organization, public_user_data } = e?.data;

      await removeUserFromCommunity({
        // @ts-ignore
        userId: public_user_data.user_id,
        // @ts-ignore
        communityId: organization.id,
      });

      return NextResponse.json({ message: "Member removed" }, { status: 201 });
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  if (eventType === "organization.updated") {
    try {
      const { id, logo_url, name, slug } = e?.data;

      await updateCommunityInfo({
        communityId: (id as string) || "",
        name: (name as string) || "",
        username: (slug as string) || "",
        image: (logo_url as string) || "",
      });

      return NextResponse.json({ message: "Member removed" }, { status: 201 });
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  if (eventType === "organization.deleted") {
    try {
      const { id } = e?.data;

      await deleteCommunity({ communityId: id as string });

      return NextResponse.json(
        { message: "Organization deleted" },
        { status: 201 }
      );
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
};
