import type { Metadata } from "next";
import ConversationalSearch from "../components/ConversationalSearch";

export const metadata: Metadata = {
  title: "Ask Samsung",
  description: "Conversational search prototype",
};

export default function SearchPage() {
  return <ConversationalSearch />;
}
