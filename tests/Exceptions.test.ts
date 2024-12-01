import "mocha";
import * as core from "../src";
import { ParsedFlow } from "../src/main/models/ParsedFlow";

describe("Exceptions", () => {
  let expect;
  before(async () => {
    expect = (await import("chai")).expect;
  });

  it("should show exceptions on wrong configuration", async () => {
    const flows: ParsedFlow[] = [
      {
        uri: "something",
        flow: {
          flowVariables: ["choices", "constants", "dynamicChoiceSets", "formulas", "variables"],
          flowResources: ["textTemplates", "stages"],
          flowMetadata: [
            "description",
            "apiVersion",
            "processMetadataValues",
            "processType",
            "interviewLabel",
            "label",
            "status",
            "runInMode",
            "startElementReference",
            "isTemplate",
            "fullName",
            "timeZoneSidKey",
            "isAdditionalPermissionRequiredToRun",
            "migratedFromWorkflowRuleName",
            "triggerOrder",
            "environments",
            "segment",
          ],
          flowNodes: [
            "actionCalls",
            "apexPluginCalls",
            "assignments",
            "collectionProcessors",
            "decisions",
            "loops",
            "orchestratedStages",
            "recordCreates",
            "recordDeletes",
            "recordLookups",
            "recordUpdates",
            "recordRollbacks",
            "screens",
            "start",
            "steps",
            "subflows",
            "waits",
          ],
          fsPath: "./tests/xmlfiles/random.flow-meta.xml",
          name: "Flow1API60",
          xmldata: {
            "@xmlns": "http://soap.sforce.com/2006/04/metadata",
            apiVersion: "60.0",
            environments: "Default",
            interviewLabel: "test {!$Flow.CurrentDateTime}",
            label: "test",
            processMetadataValues: [
              {
                name: "BuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
              {
                name: "CanvasMode",
                value: { stringValue: "AUTO_LAYOUT_CANVAS" },
              },
              {
                name: "OriginBuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
            ],
            processType: "Flow",
            runInMode: "SystemModeWithoutSharing",
            screens: {
              name: "testtest",
              label: "test",
              locationX: "176",
              locationY: "134",
              allowBack: "true",
              allowFinish: "true",
              allowPause: "true",
              showFooter: "true",
              showHeader: "true",
            },
            start: {
              locationX: "50",
              locationY: "0",
              connector: { targetReference: "testtest" },
            },
            status: "Draft",
          },
          label: "test",
          interviewLabel: "test {!$Flow.CurrentDateTime}",
          processType: "Flow",
          processMetadataValues: [
            {
              name: "BuilderType",
              value: { stringValue: "LightningFlowBuilder" },
            },
            { name: "CanvasMode", value: { stringValue: "AUTO_LAYOUT_CANVAS" } },
            {
              name: "OriginBuilderType",
              value: { stringValue: "LightningFlowBuilder" },
            },
          ],
          start: {
            locationX: "50",
            locationY: "0",
            connector: { targetReference: "testtest" },
          },
          status: "Draft",
          type: "Flow",
          elements: [
            { element: "61.0", subtype: "apiVersion", metaType: "metadata" },
            { element: "Default", subtype: "environments", metaType: "metadata" },
            {
              element: "test {!$Flow.CurrentDateTime}",
              subtype: "interviewLabel",
              metaType: "metadata",
            },
            { element: "test", subtype: "label", metaType: "metadata" },
            {
              element: {
                name: "BuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
              subtype: "processMetadataValues",
              metaType: "metadata",
            },
            {
              element: {
                name: "CanvasMode",
                value: { stringValue: "AUTO_LAYOUT_CANVAS" },
              },
              subtype: "processMetadataValues",
              metaType: "metadata",
            },
            {
              element: {
                name: "OriginBuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
              subtype: "processMetadataValues",
              metaType: "metadata",
            },
            { element: "Flow", subtype: "processType", metaType: "metadata" },
            {
              element: "SystemModeWithoutSharing",
              subtype: "runInMode",
              metaType: "metadata",
            },
            {
              element: {
                name: "testtest",
                label: "test",
                locationX: "176",
                locationY: "134",
                allowBack: "true",
                allowFinish: "true",
                allowPause: "true",
                showFooter: "true",
                showHeader: "true",
              },
              subtype: "screens",
              metaType: "node",
              connectors: [],
              name: "testtest",
              locationX: "176",
              locationY: "134",
            },
            {
              element: {
                locationX: "50",
                locationY: "0",
                connector: { targetReference: "testtest" },
              },
              subtype: "start",
              metaType: "node",
              connectors: [
                {
                  element: { targetReference: "testtest" },
                  processed: false,
                  type: "connector",
                  reference: "testtest",
                },
              ],
              name: "flowstart",
              locationX: "50",
              locationY: "0",
            },
            { element: "Draft", subtype: "status", metaType: "metadata" },
          ],
          startReference: "testtest",
        } as unknown as core.Flow,
      },
    ];
    const ruleConfig = {
      rules: {
        APIVersion: {
          severity: "error",
          expression: "===62",
        },
      },
      exceptions: {
        Flow1API60: { APIVersion: ["60.0"] },
        Flow2API61: { APIVersion: ["60.0"] },
        Flow3API59: { APIVersion: ["60.0"] },
      },
    };
    const results: core.ScanResult[] = core.scan(flows, ruleConfig);
    const { ruleResults } = results.pop() as core.ScanResult;
    expect(
      ruleResults.filter((rule) => {
        return rule.occurs;
      }).length
    ).to.equal(1);
  });

  it("should show not show any exceptions on api version", async () => {
    const flows: ParsedFlow[] = [
      {
        uri: "something",
        flow: {
          flowVariables: ["choices", "constants", "dynamicChoiceSets", "formulas", "variables"],
          flowResources: ["textTemplates", "stages"],
          flowMetadata: [
            "description",
            "apiVersion",
            "processMetadataValues",
            "processType",
            "interviewLabel",
            "label",
            "status",
            "runInMode",
            "startElementReference",
            "isTemplate",
            "fullName",
            "timeZoneSidKey",
            "isAdditionalPermissionRequiredToRun",
            "migratedFromWorkflowRuleName",
            "triggerOrder",
            "environments",
            "segment",
          ],
          flowNodes: [
            "actionCalls",
            "apexPluginCalls",
            "assignments",
            "collectionProcessors",
            "decisions",
            "loops",
            "orchestratedStages",
            "recordCreates",
            "recordDeletes",
            "recordLookups",
            "recordUpdates",
            "recordRollbacks",
            "screens",
            "start",
            "steps",
            "subflows",
            "waits",
          ],
          fsPath: "./tests/xmlfiles/random.flow-meta.xml",
          name: "Flow1API60",
          xmldata: {
            "@xmlns": "http://soap.sforce.com/2006/04/metadata",
            apiVersion: "60.0",
            environments: "Default",
            interviewLabel: "test {!$Flow.CurrentDateTime}",
            label: "test",
            processMetadataValues: [
              {
                name: "BuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
              {
                name: "CanvasMode",
                value: { stringValue: "AUTO_LAYOUT_CANVAS" },
              },
              {
                name: "OriginBuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
            ],
            processType: "Flow",
            runInMode: "SystemModeWithoutSharing",
            screens: {
              name: "testtest",
              label: "test",
              locationX: "176",
              locationY: "134",
              allowBack: "true",
              allowFinish: "true",
              allowPause: "true",
              showFooter: "true",
              showHeader: "true",
            },
            start: {
              locationX: "50",
              locationY: "0",
              connector: { targetReference: "testtest" },
            },
            status: "Draft",
          },
          label: "test",
          interviewLabel: "test {!$Flow.CurrentDateTime}",
          processType: "Flow",
          processMetadataValues: [
            {
              name: "BuilderType",
              value: { stringValue: "LightningFlowBuilder" },
            },
            { name: "CanvasMode", value: { stringValue: "AUTO_LAYOUT_CANVAS" } },
            {
              name: "OriginBuilderType",
              value: { stringValue: "LightningFlowBuilder" },
            },
          ],
          start: {
            locationX: "50",
            locationY: "0",
            connector: { targetReference: "testtest" },
          },
          status: "Draft",
          type: "Flow",
          elements: [
            { element: "61.0", subtype: "apiVersion", metaType: "metadata" },
            { element: "Default", subtype: "environments", metaType: "metadata" },
            {
              element: "test {!$Flow.CurrentDateTime}",
              subtype: "interviewLabel",
              metaType: "metadata",
            },
            { element: "test", subtype: "label", metaType: "metadata" },
            {
              element: {
                name: "BuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
              subtype: "processMetadataValues",
              metaType: "metadata",
            },
            {
              element: {
                name: "CanvasMode",
                value: { stringValue: "AUTO_LAYOUT_CANVAS" },
              },
              subtype: "processMetadataValues",
              metaType: "metadata",
            },
            {
              element: {
                name: "OriginBuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
              subtype: "processMetadataValues",
              metaType: "metadata",
            },
            { element: "Flow", subtype: "processType", metaType: "metadata" },
            {
              element: "SystemModeWithoutSharing",
              subtype: "runInMode",
              metaType: "metadata",
            },
            {
              element: {
                name: "testtest",
                label: "test",
                locationX: "176",
                locationY: "134",
                allowBack: "true",
                allowFinish: "true",
                allowPause: "true",
                showFooter: "true",
                showHeader: "true",
              },
              subtype: "screens",
              metaType: "node",
              connectors: [],
              name: "testtest",
              locationX: "176",
              locationY: "134",
            },
            {
              element: {
                locationX: "50",
                locationY: "0",
                connector: { targetReference: "testtest" },
              },
              subtype: "start",
              metaType: "node",
              connectors: [
                {
                  element: { targetReference: "testtest" },
                  processed: false,
                  type: "connector",
                  reference: "testtest",
                },
              ],
              name: "flowstart",
              locationX: "50",
              locationY: "0",
            },
            { element: "Draft", subtype: "status", metaType: "metadata" },
          ],
          startReference: "testtest",
        } as unknown as core.Flow,
      },
      {
        uri: "something",
        flow: {
          flowVariables: ["choices", "constants", "dynamicChoiceSets", "formulas", "variables"],
          flowResources: ["textTemplates", "stages"],
          flowMetadata: [
            "description",
            "apiVersion",
            "processMetadataValues",
            "processType",
            "interviewLabel",
            "label",
            "status",
            "runInMode",
            "startElementReference",
            "isTemplate",
            "fullName",
            "timeZoneSidKey",
            "isAdditionalPermissionRequiredToRun",
            "migratedFromWorkflowRuleName",
            "triggerOrder",
            "environments",
            "segment",
          ],
          flowNodes: [
            "actionCalls",
            "apexPluginCalls",
            "assignments",
            "collectionProcessors",
            "decisions",
            "loops",
            "orchestratedStages",
            "recordCreates",
            "recordDeletes",
            "recordLookups",
            "recordUpdates",
            "recordRollbacks",
            "screens",
            "start",
            "steps",
            "subflows",
            "waits",
          ],
          fsPath: "./tests/xmlfiles/random.flow-meta.xml",
          name: "Flow2API61",
          xmldata: {
            "@xmlns": "http://soap.sforce.com/2006/04/metadata",
            apiVersion: "61.0",
            environments: "Default",
            interviewLabel: "test {!$Flow.CurrentDateTime}",
            label: "test",
            processMetadataValues: [
              {
                name: "BuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
              {
                name: "CanvasMode",
                value: { stringValue: "AUTO_LAYOUT_CANVAS" },
              },
              {
                name: "OriginBuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
            ],
            processType: "Flow",
            runInMode: "SystemModeWithoutSharing",
            screens: {
              name: "testtest",
              label: "test",
              locationX: "176",
              locationY: "134",
              allowBack: "true",
              allowFinish: "true",
              allowPause: "true",
              showFooter: "true",
              showHeader: "true",
            },
            start: {
              locationX: "50",
              locationY: "0",
              connector: { targetReference: "testtest" },
            },
            status: "Draft",
          },
          label: "test",
          interviewLabel: "test {!$Flow.CurrentDateTime}",
          processType: "Flow",
          processMetadataValues: [
            {
              name: "BuilderType",
              value: { stringValue: "LightningFlowBuilder" },
            },
            { name: "CanvasMode", value: { stringValue: "AUTO_LAYOUT_CANVAS" } },
            {
              name: "OriginBuilderType",
              value: { stringValue: "LightningFlowBuilder" },
            },
          ],
          start: {
            locationX: "50",
            locationY: "0",
            connector: { targetReference: "testtest" },
          },
          status: "Draft",
          type: "Flow",
          elements: [
            { element: "61.0", subtype: "apiVersion", metaType: "metadata" },
            { element: "Default", subtype: "environments", metaType: "metadata" },
            {
              element: "test {!$Flow.CurrentDateTime}",
              subtype: "interviewLabel",
              metaType: "metadata",
            },
            { element: "test", subtype: "label", metaType: "metadata" },
            {
              element: {
                name: "BuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
              subtype: "processMetadataValues",
              metaType: "metadata",
            },
            {
              element: {
                name: "CanvasMode",
                value: { stringValue: "AUTO_LAYOUT_CANVAS" },
              },
              subtype: "processMetadataValues",
              metaType: "metadata",
            },
            {
              element: {
                name: "OriginBuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
              subtype: "processMetadataValues",
              metaType: "metadata",
            },
            { element: "Flow", subtype: "processType", metaType: "metadata" },
            {
              element: "SystemModeWithoutSharing",
              subtype: "runInMode",
              metaType: "metadata",
            },
            {
              element: {
                name: "testtest",
                label: "test",
                locationX: "176",
                locationY: "134",
                allowBack: "true",
                allowFinish: "true",
                allowPause: "true",
                showFooter: "true",
                showHeader: "true",
              },
              subtype: "screens",
              metaType: "node",
              connectors: [],
              name: "testtest",
              locationX: "176",
              locationY: "134",
            },
            {
              element: {
                locationX: "50",
                locationY: "0",
                connector: { targetReference: "testtest" },
              },
              subtype: "start",
              metaType: "node",
              connectors: [
                {
                  element: { targetReference: "testtest" },
                  processed: false,
                  type: "connector",
                  reference: "testtest",
                },
              ],
              name: "flowstart",
              locationX: "50",
              locationY: "0",
            },
            { element: "Draft", subtype: "status", metaType: "metadata" },
          ],
          startReference: "testtest",
        } as unknown as core.Flow,
      },
      {
        uri: "something",
        flow: {
          flowVariables: ["choices", "constants", "dynamicChoiceSets", "formulas", "variables"],
          flowResources: ["textTemplates", "stages"],
          flowMetadata: [
            "description",
            "apiVersion",
            "processMetadataValues",
            "processType",
            "interviewLabel",
            "label",
            "status",
            "runInMode",
            "startElementReference",
            "isTemplate",
            "fullName",
            "timeZoneSidKey",
            "isAdditionalPermissionRequiredToRun",
            "migratedFromWorkflowRuleName",
            "triggerOrder",
            "environments",
            "segment",
          ],
          flowNodes: [
            "actionCalls",
            "apexPluginCalls",
            "assignments",
            "collectionProcessors",
            "decisions",
            "loops",
            "orchestratedStages",
            "recordCreates",
            "recordDeletes",
            "recordLookups",
            "recordUpdates",
            "recordRollbacks",
            "screens",
            "start",
            "steps",
            "subflows",
            "waits",
          ],
          fsPath: "./tests/xmlfiles/random.flow-meta.xml",
          name: "Flow3API59",
          xmldata: {
            "@xmlns": "http://soap.sforce.com/2006/04/metadata",
            apiVersion: "59.0",
            environments: "Default",
            interviewLabel: "test {!$Flow.CurrentDateTime}",
            label: "test",
            processMetadataValues: [
              {
                name: "BuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
              {
                name: "CanvasMode",
                value: { stringValue: "AUTO_LAYOUT_CANVAS" },
              },
              {
                name: "OriginBuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
            ],
            processType: "Flow",
            runInMode: "SystemModeWithoutSharing",
            screens: {
              name: "testtest",
              label: "test",
              locationX: "176",
              locationY: "134",
              allowBack: "true",
              allowFinish: "true",
              allowPause: "true",
              showFooter: "true",
              showHeader: "true",
            },
            start: {
              locationX: "50",
              locationY: "0",
              connector: { targetReference: "testtest" },
            },
            status: "Draft",
          },
          label: "test",
          interviewLabel: "test {!$Flow.CurrentDateTime}",
          processType: "Flow",
          processMetadataValues: [
            {
              name: "BuilderType",
              value: { stringValue: "LightningFlowBuilder" },
            },
            { name: "CanvasMode", value: { stringValue: "AUTO_LAYOUT_CANVAS" } },
            {
              name: "OriginBuilderType",
              value: { stringValue: "LightningFlowBuilder" },
            },
          ],
          start: {
            locationX: "50",
            locationY: "0",
            connector: { targetReference: "testtest" },
          },
          status: "Draft",
          type: "Flow",
          elements: [
            { element: "59.0", subtype: "apiVersion", metaType: "metadata" },
            { element: "Default", subtype: "environments", metaType: "metadata" },
            {
              element: "test {!$Flow.CurrentDateTime}",
              subtype: "interviewLabel",
              metaType: "metadata",
            },
            { element: "test", subtype: "label", metaType: "metadata" },
            {
              element: {
                name: "BuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
              subtype: "processMetadataValues",
              metaType: "metadata",
            },
            {
              element: {
                name: "CanvasMode",
                value: { stringValue: "AUTO_LAYOUT_CANVAS" },
              },
              subtype: "processMetadataValues",
              metaType: "metadata",
            },
            {
              element: {
                name: "OriginBuilderType",
                value: { stringValue: "LightningFlowBuilder" },
              },
              subtype: "processMetadataValues",
              metaType: "metadata",
            },
            { element: "Flow", subtype: "processType", metaType: "metadata" },
            {
              element: "SystemModeWithoutSharing",
              subtype: "runInMode",
              metaType: "metadata",
            },
            {
              element: {
                name: "testtest",
                label: "test",
                locationX: "176",
                locationY: "134",
                allowBack: "true",
                allowFinish: "true",
                allowPause: "true",
                showFooter: "true",
                showHeader: "true",
              },
              subtype: "screens",
              metaType: "node",
              connectors: [],
              name: "testtest",
              locationX: "176",
              locationY: "134",
            },
            {
              element: {
                locationX: "50",
                locationY: "0",
                connector: { targetReference: "testtest" },
              },
              subtype: "start",
              metaType: "node",
              connectors: [
                {
                  element: { targetReference: "testtest" },
                  processed: false,
                  type: "connector",
                  reference: "testtest",
                },
              ],
              name: "flowstart",
              locationX: "50",
              locationY: "0",
            },
            { element: "Draft", subtype: "status", metaType: "metadata" },
          ],
          startReference: "testtest",
        } as unknown as core.Flow,
      },
    ];
    const ruleConfig = {
      rules: {
        APIVersion: {
          severity: "error",
          expression: "===62",
        },
      },
      exceptions: {
        Flow1API60: { APIVersion: ["60"] },
        Flow2API61: { APIVersion: ["61"] },
        Flow3API59: { APIVersion: ["59"] },
      },
    };
    const results: core.ScanResult[] = core.scan(flows, ruleConfig);
    results.forEach(({ ruleResults }) => {
      expect(
        ruleResults.filter((result) => {
          return result.occurs;
        }).length
      ).to.equal(0);
    });
  });
});