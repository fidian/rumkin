<?php

/**
 * Creates a GUID hex string, like 01234567-0123-0123-0123-0123456789AB
 *
 * @return string
 */
function guid() {
    $hex = '0123456789ABCDEF';
    $output = '';

    // First, generate 8+4+4+4+12 = 32 random hex chars
    while (strlen($output) < 32) {
        $output .= $hex[mt_rand(0, 15)];
    }

    // Now insert hyphens
    return substr($output, 0, 8) . '-' . substr($output, 8, 4) . '-' . substr($output, 12, 4) . '-' . substr($output, 16, 4) . '-' . substr($output, 20);
}

