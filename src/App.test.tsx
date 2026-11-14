import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import { site } from "./content/site";
import { ENDPOINT, makeContent } from "./test/fixtures";

describe("App", () => {
  it("renders every main section", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: site.headline }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "How I can help" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Experience" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Get in touch" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("points every in-page link at an element that exists", () => {
    const { container } = render(<App />);
    const anchors = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    );
    expect(anchors.length).toBeGreaterThan(0);
    for (const anchor of anchors) {
      const id = anchor.getAttribute("href")!.slice(1);
      expect(
        document.getElementById(id),
        `nothing on the page has id="${id}"`,
      ).not.toBeNull();
    }
  });

  it("opens every external link in a new tab safely", () => {
    const { container } = render(<App />);
    const external = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('a[href^="http"]'),
    );
    expect(external.length).toBeGreaterThan(0);
    for (const anchor of external) {
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor.getAttribute("rel")).toContain("noopener");
    }
  });

  it("hides the offers section and its nav link when every offer is switched off", () => {
    const content = makeContent();
    content.offers = content.offers.map((offer) => ({
      ...offer,
      enabled: false,
    }));
    render(<App content={content} />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(
      within(nav).queryByRole("link", { name: "Work with me" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "How I can help" }),
    ).not.toBeInTheDocument();
  });

  it("links an offer with a booking page straight to it", () => {
    render(<App content={makeContent({ contactFormEndpoint: ENDPOINT })} />);
    const link = screen.getByRole("link", { name: "Book a mock interview" });
    expect(link.getAttribute("href")).toBe(
      "https://cal.com/ankur-pawar-hqweow/interview-preparation-gst",
    );
    expect(screen.getByLabelText("What's it about?")).toHaveValue(
      "Fractional leadership",
    );
  });

  it("shows the hero newsletter link only once a subscribe URL is set", () => {
    const { unmount } = render(<App />);
    expect(
      screen.queryByRole("link", { name: "Get the weekly newsletter" }),
    ).not.toBeInTheDocument();
    unmount();

    const content = makeContent();
    content.newsletter = {
      name: "The Manager Notes",
      sendDay: "Tuesday",
      subscribeUrl: "https://example.com/subscribe",
    };
    render(<App content={content} />);
    expect(
      screen.getByRole("link", { name: "Get the weekly newsletter" }),
    ).toHaveAttribute("href", "#newsletter");
  });
});
