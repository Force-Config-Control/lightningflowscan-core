import { RuleCommon } from '../models/RuleCommon';
import * as core from '../../index';

export class SOQLQueryInLoop extends RuleCommon implements core.IRuleDefinition {
  
    constructor() {
      super({
        name: 'SOQLQueryInLoop',
        label: 'SOQL Query In A Loop',
        description: "To prevent exceeding Apex governor limits, it is advisable to consolidate all your SOQL queries at the conclusion of the flow.",
        type: 'pattern',
        supportedTypes: [...core.FlowType.backEndTypes, ...core.FlowType.visualTypes],
        docRefs: [{ 'label': 'Flow Best Practices', 'path': 'https://help.salesforce.com/s/articleView?id=sf.flow_prep_bestpractices.htm&type=5' }],
        isConfigurable: false
      });
    }
  
    public execute(flow: core.Flow): core.RuleResult {
      if (flow.type[0] === 'Survey') {
        return new core.RuleResult(this, []);
      }
  
      const dmlStatementTypes = ['recordLookups'];
      const loopElements: core.FlowNode[] = flow.elements.filter(node => node.subtype === 'loops') as core.FlowNode[];
      const dmlStatementsInLoops: core.FlowNode[] = [];
      const compiler = new core.Compiler();
  
      // Check if a DML statement is inside a loop
      for (const loopElement of loopElements) {
        const startOfLoop = loopElement;
  
        compiler.traverseFlow(flow, loopElement.name, (element) => {
          if (dmlStatementTypes.includes(element.subtype) && compiler.isInLoop(flow, element, startOfLoop)) {
            dmlStatementsInLoops.push(element);
          }
        });
      }
  
      let results = [];
      for (const det of dmlStatementsInLoops) {
        results.push(new core.ResultDetails(det));
      }
  
      return new core.RuleResult(this, results);
    }
  }
  