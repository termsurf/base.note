import { Mesh, SITE_OBSERVER_COMPLETE_STATE, SITE_OBSERVER_STATE, SiteObserverState, code, } from '~';
export function bindSchema(load, schema) {
    const watcher = code.registerSchema(load, schema);
    code.updateAllThroughWatcher(load, watcher);
}
export function createCodeModuleObjectNameObserverSchema(property, handle) {
    return {
        properties: {
            definitions: {
                properties: {
                    public: {
                        properties: {
                            [property]: {
                                properties: {
                                    ['*']: {
                                        handle,
                                        properties: {
                                            name: {
                                                state: [SiteObserverState.RuntimeComplete],
                                            },
                                        },
                                        state: SITE_OBSERVER_STATE,
                                    },
                                },
                                state: SITE_OBSERVER_STATE,
                            },
                        },
                        state: SITE_OBSERVER_STATE,
                    },
                },
                state: SITE_OBSERVER_STATE,
            },
        },
    };
}
export function createCodeModulePublicCollectionObserverSchema(property, handle) {
    return {
        properties: {
            definitions: {
                properties: {
                    public: {
                        properties: {
                            [property]: {
                                handle,
                                state: [SiteObserverState.CollectionGathered],
                            },
                        },
                        state: SITE_OBSERVER_STATE,
                    },
                },
                state: SITE_OBSERVER_STATE,
            },
        },
    };
}
export function createWatcherFromSchema(schema) {
    const watcher = {
        properties: {},
    };
    Object.keys(schema.properties).forEach(name => {
        const property = schema.properties[name];
        watcher.properties[name] = code.createWatcherFromSchemaProperty(property, name);
    });
    return watcher;
}
export function createWatcherFromSchemaProperty(property, name, parent, pending = 1) {
    const watcher = {
        counted: true,
        handle: property.handle,
        matched: false,
        name,
        pending,
        state: property.state,
    };
    const isDynamic = name === '*';
    Object.defineProperty(watcher, 'parent', {
        enumerable: false,
        value: parent,
    });
    Object.defineProperty(watcher, 'node', {
        enumerable: false,
        value: undefined,
        writable: true,
    });
    let higher = parent;
    while (higher) {
        higher.pending += pending;
        higher = higher.parent;
    }
    const propertyProperties = property.properties;
    if (propertyProperties) {
        const nestedProperties = {};
        Object.keys(propertyProperties).forEach(name => {
            const child = propertyProperties[name];
            const isChildDynamic = name === '*';
            nestedProperties[name] = createWatcherFromSchemaProperty(child, name, isDynamic ? undefined : watcher, isDynamic ? 0 : 1);
        });
        if (isDynamic) {
            watcher.dynamicProperties = nestedProperties;
            watcher.properties = {};
        }
        else {
            watcher.properties = nestedProperties;
        }
    }
    return watcher;
}
export function extendDynamicPropertyWatcher(load, watcher, name) {
    const { dynamicProperties } = watcher;
    code.assertRecord(dynamicProperties);
    const childWatcher = {
        counted: false,
        matched: false,
        name,
        parent: watcher,
        pending: 0,
        state: [],
    };
    const nestedProperties = {};
    Object.keys(dynamicProperties).forEach(name => {
        const child = dynamicProperties[name];
        nestedProperties[name] = createWatcherFromSchemaProperty(child, name, childWatcher);
    });
    childWatcher.properties = nestedProperties;
    const { properties } = watcher;
    code.assertRecord(properties);
    properties[name] = childWatcher;
    return childWatcher;
}
export function isObserverStateAccepted(load, potential) {
    if (potential.includes(SiteObserverState.CollectionGathered)) {
        return load === SiteObserverState.CollectionGathered;
    }
    if (potential.includes(SiteObserverState.Initialized)) {
        return SITE_OBSERVER_STATE.includes(load);
    }
    if (potential.includes(SiteObserverState.StaticComplete)) {
        return SITE_OBSERVER_COMPLETE_STATE.includes(load);
    }
    if (potential.includes(SiteObserverState.RuntimeComplete)) {
        return load === SiteObserverState.RuntimeComplete;
    }
    return false;
}
export function propagatePendingUpwards(property, amount) {
    let higher = property;
    while (higher) {
        higher.pending += amount;
        higher = higher.parent;
    }
}
export function queuePropertyUpdateHandle(load, handle, node) {
    code.addTask(load.base, () => handle(node));
}
export function registerSchema(load, schema) {
    let list = load.base.watchers[load.moduleId];
    if (!list) {
        list = load.base.watchers[load.moduleId] = [];
    }
    const watcher = code.createWatcherFromSchema(schema);
    list.push(watcher);
    return watcher;
}
export function resolveBluePath(blue) {
    let node = blue;
    const array = [];
    while (node) {
        array.push(node);
        node = node.parent;
    }
    return array.reverse();
}
export function triggerObjectBindingUpdate(load, node) {
    const watchers = load.base.watchers[load.module.id];
    if (!watchers) {
        return;
    }
    const path = code.resolveBluePath(node);
    watchers.forEach(watcher => {
        code.updateWatcherForPath(load, watcher, path);
    });
}
export function updateAllThroughWatcher(load, watcher) {
    let node = load.module.blue.node;
    for (const name in watcher.properties) {
        const property = watcher.properties[name];
        let child = node.value[name];
        code.updateAllThroughWatcherProperty(load, property, child);
    }
    // console.log(JSON.stringify(watcher, null, 2))
}
export function updateAllThroughWatcherProperty(load, property, node) {
    code.assertGenericBlue(node);
    if (code.isObserverStateAccepted(node.state, property.state)) {
        property.matched = true;
        code.propagatePendingUpwards(property, -1);
    }
    property.node = node;
    const { properties } = property;
    if (properties) {
        Object.keys(properties).forEach(name => {
            const childProperty = properties[name];
            if (childProperty.dynamicProperties) {
                switch (node.type) {
                    case Mesh.Array: {
                        const potentialChildren = node.value;
                        potentialChildren.forEach((childValue, i) => {
                            const elementProperty = code.extendDynamicPropertyWatcher(load, property, String(i));
                            code.updateAllThroughWatcherProperty(load, elementProperty, childValue);
                        });
                        break;
                    }
                    case Mesh.Map: {
                        const potentialMap = node.value;
                        for (const key in potentialMap) {
                            const childValue = potentialMap[key];
                            const elementProperty = code.extendDynamicPropertyWatcher(load, property, key);
                            code.updateAllThroughWatcherProperty(load, elementProperty, childValue);
                        }
                        break;
                    }
                    default:
                        code.throwError(code.generateInvalidCompilerStateError());
                }
            }
            else {
                switch (node.type) {
                    case Mesh.Map: {
                        node = node.value;
                    }
                    default:
                        break;
                }
                const childValue = node[name];
                code.updateAllThroughWatcherProperty(load, childProperty, childValue);
            }
        });
    }
}
export function updateWatcherForPath(load, watcher, path) {
    let properties = watcher.properties;
    let i = 0;
    while (i < path.length) {
        const node = path[i++];
        code.assertString(node.attachedAs);
        let property = properties[node.attachedAs];
        if (!property) {
            return;
        }
        property.node = node;
        if (i === path.length) {
            if (property.matched) {
                return;
            }
            property.matched = property.state.includes(node.state);
            if (property.matched) {
                while (property) {
                    property.pending--;
                    if (property.pending === 0 && property.handle) {
                        code.assertRecord(property.node);
                        const parent = property.parent;
                        if (parent?.properties) {
                            delete parent.properties[property.name];
                        }
                        code.queuePropertyUpdateHandle(load, property.handle, property.node);
                    }
                    property = property.parent;
                }
            }
            return;
        }
        properties = property.properties;
        if (!properties) {
            return;
        }
    }
}
//# sourceMappingURL=observer.js.map