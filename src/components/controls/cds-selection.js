import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { controlsWidth, nucleotide_gene } from "../../util/globals";
import CustomSelect from "./customSelect";

@connect((state) => ({
  genomeMap: state.entropy.genomeMap,
  selectedCds: state.entropy.selectedCds,
  panelsAvailable: state.controls.panelsAvailable,
}))
class CDSSelection extends React.Component {
  static propTypes = {
    genomeMap: PropTypes.array,
    selectedCds: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    panelsAvailable: PropTypes.array,
  };

  getStyles() {
    return {
      base: {
        width: controlsWidth,
        marginBottom: 0,
        fontSize: 14,
      },
    };
  }

  getOptions() {
    if (!this.props.genomeMap?.length) return [];

    const options = [];
    const seen = new Set();

    this.props.genomeMap[0].genes.forEach((gene) => {
      gene.cds.forEach((cds) => {
        if (seen.has(cds.name)) return;
        seen.add(cds.name);

        options.push({
          value: cds.name,
          label: cds.displayName ? `${cds.displayName} (${cds.name})` : cds.name,
        });
      });
    });

    return options.sort((a, b) => a.label.localeCompare(b.label));
  }

  updateCdsQuery = (cdsName) => {
    const url = new URL(window.location.href);

    if (cdsName) {
      url.searchParams.set("cds", cdsName);
    } else {
      url.searchParams.delete("cds");
    }

    url.searchParams.delete("gmin");
    url.searchParams.delete("gmax");

    window.history.pushState({}, "", url.toString());
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  render() {
    if (!this.props.panelsAvailable?.includes("entropy")) return null;

    const styles = this.getStyles();
    const options = this.getOptions();
    if (!options.length) return null;

    const selectedName =
      this.props.selectedCds &&
      this.props.selectedCds !== nucleotide_gene &&
      typeof this.props.selectedCds === "object"
        ? this.props.selectedCds.name
        : null;

    const selectedOption = selectedName
      ? options.find((opt) => opt.value === selectedName) || null
      : null;

    return (
      <div style={{ marginBottom: "12px" }}>
        <CustomSelect
          name="selectCds"
          value={selectedOption}
          options={options}
          isClearable
          isSearchable
          isMulti={false}
          placeholder="Search CDS…"
          onChange={(opt) => this.updateCdsQuery(opt ? opt.value : null)}
          styles={{
            container: (base) => ({ ...base, width: styles.base.width }),
          }}
        />
      </div>
    );
  }
}

export const CDSSelectionInfo = (
  <>
	Switch to aminoacid diversity view of the selected gene/CDS.
  </>
);

export default CDSSelection;