import { useMemo, useState } from "react";
import CodeBlock from "../components/CodeBlock.jsx";
import {
  generateFlexHTML,
  generateFlexCSS,
} from "../utils/generateFlexTemplate.js";

export default function FlexBuilder() {
  const [itemCount, setItemCount] = useState(6);
  const [direction, setDirection] = useState("row");
  const [wrap, setWrap] = useState("wrap");
  const [justify, setJustify] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("stretch");
  const [alignContent, setAlignContent] = useState("stretch");
  const [gap, setGap] = useState(12);
  const [itemMinW, setItemMinW] = useState(110);
  const [itemMinH, setItemMinH] = useState(80);

  const html = useMemo(() => generateFlexHTML(itemCount), [itemCount]);
  const css = useMemo(
    () =>
      generateFlexCSS({
        direction,
        wrap,
        justify,
        alignItems,
        alignContent,
        gap,
        itemMinW,
        itemMinH,
      }),
    [
      direction,
      wrap,
      justify,
      alignItems,
      alignContent,
      gap,
      itemMinW,
      itemMinH,
    ]
  );

  const previewStyle = {
    display: "flex",
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: justify,
    alignItems,
    alignContent,
    gap: `${gap}px`,
    minHeight: 220,
  };

  const itemStyle = {
    minWidth: `${itemMinW}px`,
    minHeight: `${itemMinH}px`,
    background: "#FFCC00",
    color: "#090040",
    display: "grid",
    placeItems: "center",
    borderRadius: "10px",
    font: "600 14px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  };

  return (
    <section className="container stack">
      <div className="preview-title">
        <strong>Flex Template Creator</strong>
        <span className="items-kbd">
          {itemCount} items • gap {gap}px
        </span>
      </div>

      <div className="grid2">
        <div className="card preview-wrap">
          <div
            className="preview"
            style={previewStyle}
            aria-label="Flex live preview"
          >
            {Array.from({ length: itemCount }, (_, i) => (
              <div style={itemStyle} key={i}>
                {i + 1}
              </div>
            ))}
          </div>

          <div className="grid2">
            <CodeBlock label="HTML" value={html} />
            <CodeBlock label="CSS" value={css} />
          </div>
        </div>

        <div className="card">
          <fieldset className="controls">
            <div className="control">
              <label htmlFor="itemCount">Items</label>
              <input
                id="itemCount"
                type="number"
                min="1"
                max="60"
                value={itemCount}
                onChange={(e) => setItemCount(+e.target.value || 1)}
              />
            </div>

            <div className="control">
              <label htmlFor="gap">Gap (px)</label>
              <input
                id="gap"
                type="number"
                min="0"
                max="60"
                value={gap}
                onChange={(e) => setGap(+e.target.value || 0)}
              />
            </div>

            <div className="control">
              <label htmlFor="direction">Direction</label>
              <select
                id="direction"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
              >
                <option>row</option>
                <option>row-reverse</option>
                <option>column</option>
                <option>column-reverse</option>
              </select>
            </div>

            <div className="control">
              <label htmlFor="wrap">Wrap</label>
              <select
                id="wrap"
                value={wrap}
                onChange={(e) => setWrap(e.target.value)}
              >
                <option>nowrap</option>
                <option>wrap</option>
                <option>wrap-reverse</option>
              </select>
            </div>

            <div className="control">
              <label htmlFor="justify">Justify Content</label>
              <select
                id="justify"
                value={justify}
                onChange={(e) => setJustify(e.target.value)}
              >
                <option>flex-start</option>
                <option>center</option>
                <option>flex-end</option>
                <option>space-between</option>
                <option>space-around</option>
                <option>space-evenly</option>
              </select>
            </div>

            <div className="control">
              <label htmlFor="alignItems">Align Items</label>
              <select
                id="alignItems"
                value={alignItems}
                onChange={(e) => setAlignItems(e.target.value)}
              >
                <option>stretch</option>
                <option>flex-start</option>
                <option>center</option>
                <option>flex-end</option>
                <option>baseline</option>
              </select>
            </div>

            <div className="control">
              <label htmlFor="alignContent">Align Content</label>
              <select
                id="alignContent"
                value={alignContent}
                onChange={(e) => setAlignContent(e.target.value)}
              >
                <option>stretch</option>
                <option>flex-start</option>
                <option>center</option>
                <option>flex-end</option>
                <option>space-between</option>
                <option>space-around</option>
              </select>
            </div>

            <div className="control">
              <label htmlFor="minw">Item min-width (px)</label>
              <input
                id="minw"
                type="number"
                min="20"
                max="600"
                value={itemMinW}
                onChange={(e) => setItemMinW(+e.target.value || 20)}
              />
            </div>

            <div className="control">
              <label htmlFor="minh">Item min-height (px)</label>
              <input
                id="minh"
                type="number"
                min="20"
                max="600"
                value={itemMinH}
                onChange={(e) => setItemMinH(+e.target.value || 20)}
              />
            </div>
          </fieldset>
        </div>
      </div>
    </section>
  );
}
