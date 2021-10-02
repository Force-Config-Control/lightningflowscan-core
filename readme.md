# Lightning Flow Scanner(Core)
### _As used in both the VSCode extension as well as SFDX plugin._

## Available Rules:

      DML statements in a loop,
      Duplicate DML operations,
      Hardcoded Ids,
      Missing flow description,
      Missing error handlers,
      Missing null handlers,
      Unconnected elements(auto-fix),
      Unused variables(auto-fix)

## Functions

`getRules(ruleNames? : string[]): IRuleDefinition[];`

Returns all rules if there are no ruleNames specified. In case ruleNames are specified, it will only return rules which are included by name. 

`scan(flows: Flow[], ruleOptions?: ScannerOptions): ScanResult[];`

If there are no ruleNames specified, it will run all available rules by default. In case that there are ruleNames specified, only the  specified rules will be ran.

`fix(flows :Flow[]): ScanResult[];`

Remove unused variables and unconnected elements from selected flows automatically.

